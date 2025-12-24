import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/auth-layout/auth-layout.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { OtpComponent } from './features/auth/pages/otp/otp.component';
import { ForgetPasswordComponent } from './features/auth/pages/forget-password/forget-password.component';
import { NewPasswordComponent } from './features/auth/pages/new-password/new-password.component';
  
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
