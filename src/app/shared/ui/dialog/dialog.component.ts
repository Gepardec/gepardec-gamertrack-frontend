import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  @Input() openDialog?: boolean;
  @Input() confirmButtonDisabled?: boolean;

  @Output() onConfirmation = new EventEmitter<Boolean>();


  closeDialog() {
    this.onConfirmation.emit(false)
    this.openDialog = false;
  }
}
