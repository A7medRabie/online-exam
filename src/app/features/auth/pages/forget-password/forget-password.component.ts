import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AuthWrapper } from "../../components/auth-wrapper/auth-wrapper";
import { FormLayoutComponent } from "../../components/form-layout/form-layout.component";
import { CustomInput } from "../../../../shared/components/custom-input/custom-input";
import { CustomButton } from "../../../../shared/components/custom-button/custom-button";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
 import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { OtpComponent } from "../otp/otp.component";
import { NewPasswordComponent } from "../new-password/new-password.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  imports: [AuthWrapper, FormLayoutComponent, CustomInput, CustomButton, ReactiveFormsModule, OtpComponent, NewPasswordComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  
  isloading=signal(false)
  step=signal(1)

  
  private readonly _fb=inject(FormBuilder)
  private readonly _authService=inject(AuthService)
  private readonly _destroyRef=inject(DestroyRef)
  private readonly _toastr=inject(ToastService)
 

  forgetPasswordForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
 

  OnSubmit() {
    if (this.forgetPasswordForm.valid) {
      this.isloading.set(true)
      this._authService.forgotPassword(this.forgetPasswordForm.value)
      .pipe(takeUntilDestroyed(this._destroyRef),
            finalize(() => this.isloading.set(false)))
      .subscribe({
        next: (response) => {

           this._toastr.success(" OTP sent to your email","Successful")
 
            this.step.set(2)

        },
        error: (error) => {
           // this.isloading.set(false)
   
                  
         } 
      })
      }  
  }

  changeStep(step:number){
    this.step.set(step)
  }


  

 
}

