import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataManagerRoutingModule } from './user-data-manager-routing.module';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ToastrModule } from 'ngx-toastr';
import { TrimDirective } from './trim.directive';

@NgModule({
  declarations: [
    TrimDirective,
  ],
  imports: [
    CommonModule,
    UserDataManagerRoutingModule,
    MatSlideToggle,
    
    ToastrModule.forRoot()
  ]
})
export class UserDataManagerModule { }
