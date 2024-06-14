import { Component,Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() heading: string | undefined;
  constructor(private router:Router){}
  userId:Number |undefined;
  ngOnInit() {
    this.decodeJWT();
  }
  decodeJWT() {
    // Retrieve the token from local storage
    const token = localStorage.getItem('jwtToken');

    if (token) {
      try {
        // Decode the token
        const decodedToken :any = jwt_decode.jwtDecode(token);
        this.userId = decodedToken.userid;
        // Access claims
        console.log(decodedToken.userid);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('No token found in local storage');
    }
  }


 // -----------------------Redirect to Home/dashboard page-----------------------
 dashboard(){
  this.router.navigate(['/user-data/dashboard']);
}
 // -----------------------Redirect to register page-----------------------
 Register(){
  this.router.navigate(['/user-data/register']);
}
// -------------------Redirect to Country page--------------------
CountryPage(){
  this.router.navigate(['/user-data/country-list']);
}
// ---------------------------------Logout User--------------------------
Logout(){
  localStorage.removeItem('jwtToken');
  this.router.navigate(['/']);
}

// ------------------------------Update user profile--------------------------------
updateProfile(){
  this.router.navigate(['/user-data/update/'+this.userId]);
}
}
