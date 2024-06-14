import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
import { DialogboxComponent } from '../../dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ResponseModel } from '../../../models/response/reponse.model';
import { CountryFormModel } from '../../../models/request/country-form.model';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-country-form',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDatepickerModule, MatRadioModule, MatSelectModule, ReactiveFormsModule, CommonModule,NavbarComponent],
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.css'
})
export class CountryFormComponent {
  countryForm !: FormGroup<CountryFormModel>;
  initialFormValues: any;
  countryId !: Number;
  NavbarHeading:string= "Add/Update Country Data";
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute, // Inject ActivatedRoute
  ) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.countryId = Number(params.get('id'));
      if (this.countryId) {
        this.getCountryData(this.countryId); // Pass the id to the getUserData method
      }
    });
    this.initializeForm();

  }


  initializeForm() {
    this.countryForm = new FormGroup<CountryFormModel>({
      name : new FormControl('', Validators.required),
      description : new FormControl(''),
      FlagUrl : new FormControl('')
    })
  }

  getCountryData(id: Number) {

    this.userservice.get('Country/GetCountryById/' + id).subscribe(
      (res:ResponseModel | null) => {
        // console.log(res)
        this.countryForm.patchValue({
          name: res?.data.name,
          description: res?.data.description,
          FlagUrl: res?.data.flagUrl
        })
        this.initialFormValues = this.countryForm.getRawValue();

      },
      error => {
        console.log(error);
      }
    )
  }


  // ----------------------------Function to check if the form has updated from previous values------------------
  hasFormChanged(): boolean {
    const currentFormValues = this.countryForm.getRawValue();
    return JSON.stringify(this.initialFormValues) !== JSON.stringify(currentFormValues);
  }
  // ----------------------------Add COuntry Data to database---------------
  addCountry() {
    if (this.countryForm.valid) {
      this.userservice.post('Country/AddCountry', this.countryForm.value).subscribe(
        (res:ResponseModel ) => {
          this.toastr.success(res.message, 'Success');
          this.router.navigate(['/user-data/country-list']);
        },
        
      );
    }
  }

  // ----------------------------Update COuntry Data to database---------------

  UpdateCountryData(id: Number) {
    if(this.countryForm.valid){
      this.userservice.put('Country/UpdateCountry/' + id, this.countryForm.value).subscribe(
        (res:ResponseModel) =>{
          this.toastr.success(res.message, 'Success');
          this.router.navigate(['/user-data/country-list']);
        }
      )
    }
  }

// -----------------------------------MAtcher for error checking-----------------------
  matcher = new MyErrorStateMatcher();

}

