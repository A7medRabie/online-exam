import { Component, signal, inject, DestroyRef } from "@angular/core"
import { takeUntilDestroyed } from "@angular/core/rxjs-interop"
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms"
 import { finalize } from "rxjs"
import { AuthOrDividerComponent } from "../../components/auth-or-divider/auth-or-divider.component"
import { AuthWrapper } from "../../components/auth-wrapper/auth-wrapper"
import { CustomButton } from "../../../../shared/components/custom-button/custom-button"
import { CustomInput } from "../../../../shared/components/custom-input/custom-input"
import { FormLayoutComponent } from "../../components/form-layout/form-layout.component"
import { SocialButtonsComponent } from "../../components/social-buttons/social-buttons.component"
import { AuthService } from "../../../../core/services/auth.service"
import { ToastService } from "../../../../core/services/toast.service"
import { Router } from "@angular/router"

 
 
@Component({
  selector: 'app-register',
  imports: [FormLayoutComponent, AuthOrDividerComponent, SocialButtonsComponent, CustomButton, CustomInput, AuthWrapper  ,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
 
  isloading=signal(false)
   

  private readonly _fb=inject(FormBuilder)
  private readonly _authService=inject(AuthService)
  private readonly _destroyRef=inject(DestroyRef)
  private readonly _toastr=inject(ToastService)
  private readonly _router=inject(Router)

  registerForm: FormGroup = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]]
       
    },   { validators: this.matchPasswordsValidator }
);
 
  


matchPasswordsValidator(form:AbstractControl){ // for matching password
     
      const pass=form.get("password")?.value;
      const repass=form.get("rePassword")?.value;
      if (pass===repass) {
        return null
      }else {return{misMatch:true}}  // return mismath in error of api instead of null
 
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isloading.set(true)
      this._authService.register(this.registerForm.value).pipe(takeUntilDestroyed(this._destroyRef),
    finalize(() => this.isloading.set(false))).subscribe({
        next: (response) => {
           this._toastr.success("Registration Successful","Welcome Aboard!")
          this._router.navigate(['/login'])

        },
        error: (error) => {
            
        //  this.isloading=false
   
                  
         },
         
      })
      } 
  }

 
}
