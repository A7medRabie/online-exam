import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/auth/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { OtpComponent } from './core/auth/otp/otp.component';
import { ForgetPasswordComponent } from './core/auth/forget-password/forget-password.component';
import { NewPasswordComponent } from './core/auth/new-password/new-password.component';
import { MainLayoutComponent } from './core/auth/layouts/main-layout/main-layout.component';
 
export const routes: Routes =
 [
   //  {path: '', redirectTo: 'home', pathMatch: 'full' },
   //  {path:"",component:MainLayoutComponent,children:[
       
   //     ]},
     {path:"",component:AuthLayoutComponent,children:[
        {path: 'login', component: LoginComponent, title: 'Login page' },
        {path: 'register', component: RegisterComponent, title: 'Register page' },
        {path: 'verify-otp', component: OtpComponent, title: 'OTP page' },
        {path: 'forget-password', component: ForgetPasswordComponent, title: 'forgetPassword page' },
        {path: 'reset-password', component: NewPasswordComponent, title: 'resetPassword page' },

       ]},



];
