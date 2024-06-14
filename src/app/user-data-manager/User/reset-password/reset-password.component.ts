import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective, NgForm, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from '../../../models/response/reponse.model';
import { ResetPasswordModel } from '../../../models/request/reset-password.model';
import * as jwt_decode from 'jwt-decode';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

// const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   console.log("PAsswordMatchValidator");
  
//   const password = control.get('Password');
//   const confirmPassword = control.get('confirmPassword');

//   // Check if passwords match and are not just whitespace
//   if (password && confirmPassword && password.value.trim() !== confirmPassword.value.trim()) {
//     return { 'passwordMismatch': true };
//   }

//   return null; // Passwords match or are empty, no error
// };

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})



export class ResetPasswordComponent {
  token !: string | null ;
  email !:string | null ;
  ResetPasswdForm !: FormGroup<ResetPasswordModel>;
  error: boolean = false;
  message: string | undefined;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private toastr: ToastrService, private userservice: UserService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      // console.log(this.token);
      if (!this.authService.isTokenValid(this.token)) {
        this.toastr.error("Invalid Link try again later", 'Validation Error');
        this.router.navigate(['/user-data/login']);
      }
    })
    this.decodeJWT(this.token);
    this.initializeForm();
  }

  decodeJWT(token:string|null) {
    // Retrieve the token from local storage

    if (token) {
      try {
        // Decode the token
        const decodedToken :any = jwt_decode.jwtDecode(token);
        this.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        // Access claims
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found in local storage');
    }
  }



  initializeForm() {
    this.ResetPasswdForm = new FormGroup<ResetPasswordModel>({
      Password: new FormControl('', [Validators.required, Validators.pattern(/^.{6,}$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^.{6,}$/)]),
      Email : new FormControl(this.email,Validators.required)
    }
    );

  }

  // -------------------------------Submit form function---------------------------
  submit() {
    if (this.ResetPasswdForm.valid) {
      // this.submitEM.emit(this.form.value);
      const password = this.ResetPasswdForm.get('Password')?.value;
      const confirmPassword = this.ResetPasswdForm.get('confirmPassword')?.value;
      if (password === confirmPassword && password?.trim() != '') {


        this.userservice.post('user/reset-password', this.ResetPasswdForm.value).subscribe(
          (res: ResponseModel) => {
            // this.message = 'Employee created successfully!';
            this.error = false;
            this.toastr.success(res.message, 'Success');
            // localStorage.setItem('jwtToken', res.token);
            console.log('Response:', res.message);
            this.router.navigate(['/user-data/login'])
          },

        );
        // this.error=false;
      }
      else {
        this.error = true;
        this.message = "password and confirm should be same";
      }
    }
    else {
      this.error = true;
      this.message = "Enter all above fields correctly";
    }
  }

  Register() {
    this.router.navigate(['/user-data/register']);
  }

  matcher = new MyErrorStateMatcher();
}
