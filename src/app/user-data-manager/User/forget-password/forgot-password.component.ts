import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordModel } from '../../../models/request/forget-password.model';
import { ResponseModel } from '../../../models/response/reponse.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgotPasswordComponent {
  error: boolean = false;
  message: string | undefined;
  ForgotPasswdForm !: FormGroup<ForgetPasswordModel>;

  constructor(private router: Router, private formBuilder: FormBuilder, private userservice: UserService, private toastr: ToastrService // Inject ToastrService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.ForgotPasswdForm = new FormGroup<ForgetPasswordModel>({
      ForgetPasswordIdentifier: new FormControl('', Validators.required),
    });

  }
  // -------------------------------Submit form function---------------------------
  submit() {
    if (this.ForgotPasswdForm.valid) {
      // this.submitEM.emit(this.form.value);
      this.userservice.post('user/forgot-password', this.ForgotPasswdForm.value).subscribe(
        (res: ResponseModel) => {
          // this.message = 'Employee created successfully!';
          this.error = false;
          this.toastr.success('reset password link sent to your registered mail', 'Success');
          // localStorage.setItem('jwtToken', res.token);
          console.log('Response:', res.message);
          this.router.navigate(['/user-data/login'])
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

  Register() {
    this.router.navigate(['/user-data/register']);
  }
  matcher = new MyErrorStateMatcher();

}
