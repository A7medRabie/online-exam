import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-button',
  imports: [],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.css',
})
export class CustomButton {
@Input() label: string = ''
isloading=input<boolean>(false) 
@Input() disabled: boolean = false
@Output() onClick = new EventEmitter<Event>();
handleClick(e: Event) {
  
  this.onClick.emit(e);
  
}
}
