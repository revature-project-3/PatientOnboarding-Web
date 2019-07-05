import {Component, Input} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edituser',
  templateUrl: 'edituser.component.html'
})
export class EdituserComponent {
  closeResult: string;
  @Input() id: number;
  myForm: FormGroup;
  states = ['AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM',
          'FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA',
          'ME','MH','MD','MA','MI','MN','MS','MO','MT','NE','NV',
          'NH','NJ','NM','NY','NC','ND','MP','OH','OK','OR','PW',
          'PA','PR','RI','SC','SD','TN','TX','UT','VT','VI','VA',
          'WA','WV','WI','WY','AE','AA','AP'];
  constructor(public modalService: NgbActiveModal, private fb: FormBuilder) {
    this.createForm();
  }
  private createForm() {
    this.myForm = this.fb.group({
      firstName: '',
      lastName: '',
      password: '',
      city: ''
    });
  }
  closeModal() {
    this.modalService.close('Modal Closed');
  }
  private submitForm() {
    this.modalService.close(this.myForm.value);
  }
}
