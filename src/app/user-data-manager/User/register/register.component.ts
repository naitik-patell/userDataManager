import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ResponseModel } from '../../../models/response/reponse.model';
import { UserRegisterModel } from '../../../models/request/user-register.model';
import { GenderModel } from '../../../models/Entities/gender.model';
import { CountryModel } from '../../../models/Entities/country.model';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatRadioModule, MatSelectModule, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  Gender: GenderModel[] = [];
  Countries: CountryModel[] = [];
  RegisterForm !: FormGroup<UserRegisterModel>;
  initialFormValues: any;
  id !: Number;
  NavbarHeading: string = "Register User";

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute, // Inject ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.GetGenderData();
    this.GetCountriesData();
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); // Convert the id to a number
      if (this.id) {
        this.getUserData(this.id); // Pass the id to the getUserData method
      }
    });
    this.initializeForm();
  }

  initializeForm() {

    this.RegisterForm = new FormGroup<UserRegisterModel>({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', []),
      countryId: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      streetAddress: new FormControl('', Validators.required)
    });
    this.setPasswordValidators();
  }

  setPasswordValidators() {
    if (this.RegisterForm != undefined) {
      const passwordControl = this.RegisterForm.get('password');
      if (this.id) {
        passwordControl?.setValidators([Validators.pattern(/^.{6,}$/)]); // Remove validators if id is present
        passwordControl?.disable();
      } else {
        passwordControl?.setValidators([Validators.required, Validators.pattern(/^.{6,}$/)]); // Add validators if no id
        passwordControl?.enable();
      }
      passwordControl?.updateValueAndValidity(); // Update the validity
    }
  }

  // ---------------------------Get genders data from database----------------
  GetGenderData() {
    this.userservice.get("Gender").subscribe(
      (res: ResponseModel | null) => {
        // console.log("Gender : ", res)
        this.Gender = res?.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  // ---------------------------Get countries data from database----------------

  GetCountriesData() {

    this.userservice.get("country/GetCountries").subscribe(
      (res: ResponseModel | null) => {
        // console.log("Countries : ", res)
        this.Countries = res?.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  // ---------------------------Get User  data from database----------------
  getUserData(id: Number) {
    this.userservice.get("user/" + id.toString()).subscribe(
      (res: ResponseModel | null) => {
        this.RegisterForm?.patchValue({
          firstName: res?.data.firstName,
          lastName: res?.data.lastName,
          email: res?.data.email,
          phone: res?.data.phone,
          userName: res?.data.userName,
          countryId: res?.data.countryId,
          gender: res?.data.gender,
          birthDate: res?.data.birthDate,
          streetAddress: res?.data.streetAddress
        });
        this.initialFormValues = this.RegisterForm?.getRawValue();
        // this.isPasswordDisabled=true;
      },
      error => {
        console.log(error);
      }
    );
  }


  // --------------------------------------Register User data in database & redirect to Dashboard-----------------------------------

  RegisterUser() {
    if (this.RegisterForm?.valid) {

      debugger
      const formValue = this.RegisterForm.value;
      // Format the birthDate field
      if (formValue.birthDate) {
        const date = new Date(formValue.birthDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed in JS, add 1 to get the correct month
        const day = ('0' + date.getDate()).slice(-2);

        formValue.birthDate = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD

      }
      this.userservice.post("User/Register", this.RegisterForm.value).subscribe(
        (res: ResponseModel) => {
          this.toastr.success(res.message, 'Success');
          this.toastr.success('Email Sent to your mail for login', 'Success');
          this.router.navigate(['/user-data/login']);
        },

      );
    }
    else {
      this.toastr.error("Please fill all the required fields");
    }
  }


  // ----------------------------Function to check if the form has updated from previous values------------------
  hasFormChanged(): boolean {
    const currentFormValues = this.RegisterForm?.getRawValue();
    return JSON.stringify(this.initialFormValues) !== JSON.stringify(currentFormValues);
  }

  // --------------------------------------Update User data in database & redirect to Dashboard-----------------------------------
  UpdateUserData(id: Number) {
    if (this.RegisterForm?.valid) {

      const formValue = { ...this.RegisterForm.value, password: "" };

      // Format the birthDate field
      if (formValue.birthDate) {
        const date = new Date(formValue.birthDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed in JS, add 1 to get the correct month
        const day = ('0' + date.getDate()).slice(-2);

        formValue.birthDate = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD
      }
      this.userservice.put("User/" + this.id, formValue).subscribe(

        (res: ResponseModel) => {
          this.toastr.success(res.message, 'Success');
          // this.toastr.success('User Data updated successfully', 'Success');
          this.router.navigate(['/user-data/dashboard']);
        },
        error => {
          if (error.status === 400) {
            // this.message = error.error.message; // Get the message from the response body
            this.toastr.error("Some error occuredsfdsfdsfd try agin later", 'Unauthorized');

          }
          else if (error.status == 409) {
            this.toastr.error(error.error.message, 'Error');
          }
          else {
            this.toastr.error("An unexpected error occured", 'Error');

          }

        }
      );
    }
    else {
      this.toastr.error("Please fill all the required fields");
    }
  }

  matcher = new MyErrorStateMatcher();

}
