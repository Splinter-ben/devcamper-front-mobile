import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
})
export class InputTextareaComponent {
  @Input() form: FormGroup;
  @Input() type: null;
  @Input() label: String;
  @Input() name: String;
}
