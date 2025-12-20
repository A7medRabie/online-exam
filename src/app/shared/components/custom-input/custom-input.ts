import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-input',
  imports: [],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true
    }
  ],
})
export class CustomInput {
   @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() passIcon: string = '';
  @Input() type: string = '';
  @Input() label: string = '';

  value: string = '';

  togglePassword() {
    if (this.type === 'password') {
      this.type = 'text';
      this.passIcon = 'pi pi-eye-slash';
    } else {
      this.type = 'password';
      this.passIcon = 'pi pi-eye';
    }
  }

  onChange:(value: string ) => void = () => {};
 onTouched: () => void = () => {};

 writeValue(value: string): void {
    this.value = value;
   }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

   handleInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

}
