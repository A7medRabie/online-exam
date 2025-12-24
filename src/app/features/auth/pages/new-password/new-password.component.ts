import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { AuthWrapper } from "../../components/auth-wrapper/auth-wrapper";
import { FormLayoutComponent } from "../../components/form-layout/form-layout.component";
import { CustomInput } from "../../../../shared/components/custom-input/custom-input";
import { CustomButton } from "../../../../shared/components/custom-button/custom-button";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
 import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { finalize } from 'rxjs';
import { sign } from 'crypto';

@Component({
  selector: 'app-new-password',
  imports: [AuthWrapper, FormLayoutComponent, CustomInput, CustomButton, FormsModule,ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent  {
   
  isloading=signal<boolean>(false)
  // onStepChange=output<number>();

  private readonly _fb=inject(FormBuilder)
  private readonly _authService=inject(AuthService)
  private readonly _destroyRef=inject(DestroyRef)
   private readonly _router=inject(Router)
   private readonly _toastr=inject(ToastService)

  resetPassword: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

 
  OnSubmit() {
     if (this.resetPassword.valid) {
      this.isloading.set(true)
      this._authService.resetPassword(this.resetPassword.value)
      .pipe(takeUntilDestroyed(this._destroyRef),
      finalize(() => this.isloading.set(false))).subscribe({
        next: (response) => {
          console.log(response);
           this._toastr.success("Password Reset Successful")
           localStorage.setItem('token',response.token)
            // this.isloading=false
            // this.onStepChange.emit(3)

            this._router.navigate(['/login'])

        },
        error: (error) => {
          
          //  this.isloading=false
   
                  
         } 
      })
      } 
  }
}
