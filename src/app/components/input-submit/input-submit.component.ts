import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-submit',
  templateUrl: './input-submit.component.html',
  styleUrls: ['./input-submit.component.scss'],
})
export class InputSubmitComponent{
  @Input() type: null;
  @Input() color: String;
  @Input() fill: String;
  @Input() expand: String;
  @Input() disabled: false;
}
