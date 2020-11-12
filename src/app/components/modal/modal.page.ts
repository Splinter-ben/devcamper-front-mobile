import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {
  @Input() title: string;
  @Input() description: string;
  @Input() bootcampTitle: string;
  @Input() bootcampDesc: string;

  constructor(public modalController: ModalController) {}

  close() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
