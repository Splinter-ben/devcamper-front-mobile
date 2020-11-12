import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent {
  @Input() form: FormGroup;
  @Input() name: String;
  @Input() label: String;
  @Input() option1: String;
  @Input() option2: String;
  @Input() option3: String;
}
