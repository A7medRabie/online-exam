import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
 
@Component({
  selector: 'app-form-layout',
  imports: [RouterLink],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.scss',
})
export class FormLayoutComponent {
@Input() formtitle: string = '';
@Input() formsubtitle: string = '';
@Input() helpertext: string = '';
@Input() helperlink: string = '';
@Input() forgetLink: string = '';

}
