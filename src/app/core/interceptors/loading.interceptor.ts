import { HttpInterceptor, HttpInterceptorFn } from "@angular/common/http"
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

export const loadingInterceptor:HttpInterceptorFn=(req,next)=>{
     
    const spiner = inject(NgxSpinnerService);
    spiner.show();
 
    return next(req).pipe(
      finalize(() => {
        spiner.hide();
          
      })

    );

}