import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent {
  @Input() errorMessage: string | boolean = null;
}
