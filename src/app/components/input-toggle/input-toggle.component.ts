import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-toggle',
  templateUrl: './input-toggle.component.html',
  styleUrls: ['./input-toggle.component.scss'],
})
export class InputToggleComponent{
  @Input() form: FormGroup;
  @Input() formControlName = null;
  @Input() name: String;
  @Input() type: String;
  @Input() label: String;
}
