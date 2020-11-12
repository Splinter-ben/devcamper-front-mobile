import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss'],
})
export class InputListComponent {
  constructor(public modalController: ModalController) {}
  @Input() modalTitle: String;
  @Input() modalDescription: String;
  @Input() modalCreatedAt: String;
  @Input() modalBootcampTitle: String;
  @Input() modalBootcampDesc: String;
  
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        title: this.modalTitle,
        description: this.modalDescription,
        bootcampTitle: this.modalBootcampTitle,
        bootcampDesc: this.modalBootcampDesc
      },
    });
    return await modal.present();
  }
}
