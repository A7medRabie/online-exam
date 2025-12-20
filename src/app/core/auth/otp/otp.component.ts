import { Component, DestroyRef, inject, OnInit, output, Output, signal } from '@angular/core';
import { AuthWrapper } from "../../../shared/components/auth-wrapper/auth-wrapper";
import { FormLayoutComponent } from "../../../shared/components/form-layout/form-layout.component";
import { InputOtpModule } from 'primeng/inputotp';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomButton } from "../../../shared/components/custom-button/custom-button";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
 import { Router } from '@angular/router';
import { verifyOtp } from '../../interfaces/password.interface';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { sign } from 'crypto';
import { finalize } from 'rxjs';
   
@Component({
  standalone: true,
  selector: 'app-otp',
  imports: [AuthWrapper, FormLayoutComponent, InputOtpModule, FormsModule, CustomButton,ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent  {
  value:string='';
  verifyOtp!:verifyOtp
  isloading=signal(false)
  onStepChange=output<number>();

   private readonly _authService=inject(AuthService)
  private readonly _destroyRef=inject(DestroyRef)
  private readonly _toastr=inject(ToastService)
  private readonly _router=inject(Router)

  OnSubmit() {
    
     
      this.isloading.set(true)
      this.verifyOtp={resetCode:this.value}
      this._authService.verifyOtp(this.verifyOtp).pipe(takeUntilDestroyed(this._destroyRef),
    finalize(() => this.isloading.set(false))).subscribe({
        next: (response) => {
            this._toastr.success(" OTP verified","Successful")
            // this.isloading.set(false)
            this.onStepChange.emit(3)
            // this._router.navigate(['/reset-password'])
            

        },
        error: (error) => {
             
        //  this.isloading.set(false)
   
                  
         },
         
      })
      }  
  }

