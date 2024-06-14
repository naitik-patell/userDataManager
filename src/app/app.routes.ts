import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'user-data',loadChildren:()=>import('./user-data-manager/user-data-manager.module').then(m=>m.UserDataManagerModule)},
    {path:'',redirectTo:'/user-data/login',pathMatch:'full'}
];
