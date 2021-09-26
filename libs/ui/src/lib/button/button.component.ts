import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'hsbc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label = '';
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClick = new EventEmitter<void>();

  constructor() {}

  handleClick() {
    this.onClick.emit();
  }
}
