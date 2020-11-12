import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { BootcampService } from 'src/app/services/api/bootcamp/bootcamp.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  bootcamps: Record<string, any>;
  bootcampForm: FormGroup;
  zipcode: string;
  distance: string;
  data: any;
  select: string;
  sort: string;
  limit = '0';
  page = 1;

  constructor(
    private bootcampService: BootcampService,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.displayAllBootcamps();
    this.bootcampForm = this.formBuilder.group({
      select: new FormControl(this.select),
    });
  }

  /**
   * Show all Bootcamps
   */
  displayAllBootcamps() {
    this.bootcampService.getBootcamps().subscribe((bootcamps) => {
      this.bootcamps = bootcamps['data'];
    });
  }

  /**
   * Reset bootcamps filter to null
   */
  resetBootcamps() {
    this.bootcampService.getBootcamps().subscribe((bootcamps) => {
      this.bootcamps = bootcamps['data'];
    });
    this.page = 1;
  }

  /**
   * Locate bootcamps with zipcode and dstance
   */
  async presentAlertPromptLocate() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Zipcode & Distance',
      inputs: [
        {
          name: 'zipcode',
          type: 'text',
          value: '',
          placeholder: 'Zipcode',
        },
        {
          name: 'distance',
          type: 'text',
          value: '',
          placeholder: 'Distance in km',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            this.zipcode = alertData.zipcode;
            this.distance = alertData.distance;

            // Get filtered bootcamps
            this.bootcampService
              .getBootcampInRadius(this.zipcode, this.distance)
              .subscribe((data) => {
                this.data = data;

                if ((data as any).success === true) {
                  this.bootcamps = data['data'];
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.data.libelleMessage.error,
                  });
                }
              });
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Advanced filter select value
   * @param value
   */
  onModelChange(value) {
    this.select = value.detail['value'];

    this.bootcampService.getBootcampsSelect(this.select).subscribe((data) => {
      this.data = data;

      if ((data as any).success === true) {
        this.bootcamps = data['data'];
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.data.libelleMessage.error,
        });
      }
    });
  }

  /**
   * Sort the bootcamps by name and or description
   */
  async presentAlertCheckboxSort() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sort',
      inputs: [
        {
          name: 'sortValue',
          type: 'checkbox',
          label: 'Name',
          value: 'name',
          checked: false,
        },

        {
          name: 'sortValue',
          type: 'checkbox',
          label: 'Description',
          value: 'description',
          checked: false,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            this.sort = alertData;

            // Sorting the bootcamps with select fields
            this.bootcampService
              .getBootcampsSorted(this.sort)
              .subscribe((data) => {
                this.data = data;

                if ((data as any).success === true) {
                  this.bootcamps = data['data'];
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.data.libelleMessage.error,
                  });
                }
              });
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Filter bootcamps available per page
   */
  async presentAlertPromptFilter() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bootcamps per page',
      inputs: [
        {
          name: 'sortValue',
          type: 'radio',
          label: '1',
          value: '1',
          checked: false,
        },
        {
          name: 'sortValue',
          type: 'radio',
          label: '3',
          value: '3',
          checked: false,
        },
        {
          name: 'sortValue',
          type: 'radio',
          label: '10',
          value: '10',
          checked: false,
        },
        {
          name: 'sortValue',
          type: 'radio',
          label: '25',
          value: '25',
          checked: false,
        },
        {
          name: 'sortValue',
          type: 'radio',
          label: '50',
          value: '50',
          checked: false,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            this.limit = alertData;
            // reset page number
            this.page = 1;

            // Sorting number of bootcamps by page
            this.bootcampService
              .getBootcampsByPage(this.limit)
              .subscribe((data) => {
                this.data = data;

                if ((data as any).success === true) {
                  this.bootcamps = data['data'];
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.data.libelleMessage.error,
                  });
                }
              });
          },
        },
      ],
    });

    await alert.present();
  }

  pagePrev() {
    this.page--;
    if (this.page < 0) {
      return this.page === 0;
    } else {
      this.page.toString();
    }

    this.bootcampService
      .getBootcampsNextPrevPage(this.limit, this.page.toString())
      .subscribe((data) => {
        this.data = data['data'];
        this.bootcamps = this.data;
      });
  }

  pageNext() {
    this.page++;
    if (this.page < 0) {
      return this.page === 0;
    } else {
      this.page.toString();
    }

    this.bootcampService
      .getBootcampsNextPrevPage(this.limit, this.page.toString())
      .subscribe((data) => {
        this.data = data['data'];
        this.bootcamps = this.data;
      });
  }
}
