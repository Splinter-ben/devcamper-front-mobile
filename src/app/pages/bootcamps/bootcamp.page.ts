import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BootcampService } from 'src/app/services/api/bootcamp/bootcamp.service';
import { Bootcamp } from './bootcamp.interface';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.page.html',
  styleUrls: ['./bootcamp.page.scss'],
})
export class BootcampPage implements OnInit {
  bootcampForm: FormGroup;
  housing = false;
  jobAssistance = false;
  jobGuarantee = false;
  acceptGi: false;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private bootcampService: BootcampService
  ) {}

  ngOnInit() {
    this.bootcampForm = this.formBuilder.group({
      name: new FormControl('Modern Tech Bootcamp', [Validators.required]),
      description: new FormControl(
        `Devworks is a full stack JavaScript Bootcamp located in the heart of Boston that focuses on the technologies 
        you need to get a high paying job as a web developer`,
        [Validators.required]
      ),

      website: new FormControl('https://devworks.com"', [Validators.required]),
      phone: new FormControl('(111) 111-1111', [Validators.required]),
      email: new FormControl('enroll@devworks.com', [
        Validators.required,
        Validators.email,
      ]),
      address: new FormControl('233 Bay State Rd Boston MA 02215', [
        Validators.required,
      ]),
      careers: new FormControl(
        ['Web Development', 'UI/UX', 'Business'],
        [Validators.required]
      ),

      housing: new FormControl(this.housing, [Validators.required]),
      jobAssistance: new FormControl(this.jobAssistance, [Validators.required]),
      jobGuarantee: new FormControl(this.jobGuarantee, [Validators.required]),
      acceptGi: new FormControl(this.acceptGi, [Validators.required]),
    });
  }

  /**
   * Send data to create a new Bootcamp
   * @param bootcampForm
   */
  onSubmit(bootcampForm: Bootcamp) {
    this.bootcampService.createBootcamp(bootcampForm).subscribe((data) => {
      this.data = data;

      if ((data as any).success === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bootcamp created',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.data.libelleMessage.error,
        });
      }
    });

    //this.changeValue(this.bootcampForm.get('housing').value);
  }

  /**
   * Get boolean value from toogle bouton
   * @param value
   */
  housingValue(value) {
    this.housing = value.checked;
  }

  jobAssistanceValue(value) {
    this.jobAssistance = value.checked;
  }

  jobGuaranteeValue(value) {
    this.jobGuarantee = value.checked;
  }

  acceptGivalue(value) {
    this.acceptGi = value.checked;
  }
}
