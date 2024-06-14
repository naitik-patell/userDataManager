import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { TrimDirective } from '../../trim.directive';
import { ResponseModel } from '../../../models/response/reponse.model';
import { LoginFormModel } from '../../../models/request/login-form.model';
// import { provideToastr } from 'ngx-toastr';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSlideToggle, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSlideToggleModule, MatToolbarModule, MatIconModule, MatMenuModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})




export class LoginComponent {
  error: boolean = false;
  message: string | undefined;
  LoginForm !: FormGroup<LoginFormModel>;
  hidePassword = true; // Initially hide password
  passwordFieldType = 'password'; // Initially set input type to 'password'

  constructor(private router: Router, private formBuilder: FormBuilder, private userservice: UserService, private toastr: ToastrService // Inject ToastrService
  ) { }
  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.LoginForm = new FormGroup<LoginFormModel>({
      LoginIdentifier: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, Validators.pattern(/^.{6,}$/)])
    });

  }
  submit() {
    if (this.LoginForm.valid) {
      // this.submitEM.emit(this.form.value);
      this.userservice.post('user/login', this.LoginForm.value).subscribe(
        (res: ResponseModel) => {
          // this.message = 'Employee created successfully!';
          this.error = false;
          this.toastr.success('Login successful!', 'Success');
          localStorage.setItem('jwtToken', res.token);
          console.log('Response:', res.message);
          this.router.navigate(['/user-data/dashboard'])
        },

      );
      // this.error=false;
    }
    else {
      this.error = true;
      this.message = "Enter all above fields correctly";
      // this.toastr.warning(this.message, 'Validation Error');

    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.passwordFieldType = this.hidePassword ? 'password' : 'text';

  }

  Register() {
    this.router.navigate(['/user-data/register']);
  }
  matcher = new MyErrorStateMatcher();



}
