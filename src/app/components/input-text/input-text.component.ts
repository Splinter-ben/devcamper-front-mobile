import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent {
  @Input() form: FormGroup;
  @Input() type = '';
  @Input() name: String;
  @Input() label:String;
  @Input() errorRequiredLabel:string;
  @Input() errorConfirmPassword:string;
}
