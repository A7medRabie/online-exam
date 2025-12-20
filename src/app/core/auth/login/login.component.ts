import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AuthWrapper } from "../../../shared/components/auth-wrapper/auth-wrapper";
import { FormLayoutComponent } from "../../../shared/components/form-layout/form-layout.component";
import { CustomInput } from "../../../shared/components/custom-input/custom-input";
import { CustomButton } from "../../../shared/components/custom-button/custom-button";
import { SocialButtonsComponent } from "../../../shared/components/social-buttons/social-buttons.component";
import { AuthOrDividerComponent } from "../../../shared/components/auth-or-divider/auth-or-divider.component";
import { FormGroup, FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
 import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { sign } from 'crypto';
import { finalize } from 'rxjs';
 @Component({
  selector: 'app-login',
  imports: [AuthWrapper, FormLayoutComponent, CustomInput, CustomButton, SocialButtonsComponent, AuthOrDividerComponent, ɵInternalFormsSharedModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
   isloading=signal(false)

  private readonly _fb=inject(FormBuilder)
  private readonly _authService=inject(AuthService)
  private readonly _destroyRef=inject(DestroyRef)
   private readonly _router=inject(Router)
   private readonly _toastr=inject(ToastService)

  loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });


  onSubmit() {
     if (this.loginForm.valid) {
      this.isloading.set(true)
      this._authService.login(this.loginForm.value)
      .pipe(takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isloading.set(false))).subscribe({
        next: (response) => {
            this._toastr.success("Login Successful")
           localStorage.setItem('token',response.token)
           
            this._router.navigate(['/home'])

        },
        error: (error) => {
            // this.isloading=false
                  
         } 
      })
      }  
  }
}
