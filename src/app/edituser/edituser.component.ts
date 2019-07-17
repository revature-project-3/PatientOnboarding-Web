import {Component, Input, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import {SelectModule} from 'ng2-select';
import {MyForm} from '../services/myForm';
import {ActivatedRoute} from '@angular/router';
import {CurrentUserService} from '../services';
import { IUser } from '../services/User';
import { isBuffer } from 'util';



@Component({
  selector: 'app-edituser',
  templateUrl: 'edituser.component.html'
})
export class EdituserComponent implements OnInit {
  closeResult: string;
  @Input() id: number;
  loading = false;
  submitted = false;
  myForm: FormGroup;
  updateForm: MyForm;
  returnUrl: string;
  updateUser = {} as IUser;

  states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM',
          'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
          'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
          'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW',
          'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
          'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];

  constructor(public modalService: NgbActiveModal,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private userService: CurrentUserService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {


this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
}
get f() { return this.myForm.controls; }

  private createForm() {
    this.myForm = this.fb.group({
      fullName: '',
      city: '',
      state: '',
      birthdate: '',
      address1: '',
      address2: '',
      zipcode: '',
      email: '',
      homePhone: ''
    });
  }
  closeModal() {
    this.modalService.close('Modal Closed');
  }
  private submitForm() {

    this.modalService.close(this.myForm.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.myForm.invalid) {
        return;
    }
    this.updateForm = this.myForm.value;
    console.log(this.updateForm);


    this.loading = true;
    this.userService.updateUser(  this.updateForm.fullName,
                                    this.updateForm.birthdate,
                                    this.updateForm.email,
                                    this.updateForm.city,
                                    this.updateForm.homePhone,
                                    this.updateForm.state,
                                    this.updateForm.address1,
                                    this.updateForm.address2,
                                    this.updateForm.zipcode)
    .subscribe();
    this.updateUser.fullName = this.updateForm.fullName;
    this.updateUser.birthdate = this.updateForm.birthdate;
    this.updateUser.email = this.updateForm.email;
    this.updateUser.city = this.updateForm.city;
    this.updateUser.homePhone = this.updateForm.homePhone;
    this.updateUser.state = this.updateForm.state;
    this.updateUser.address1 = this.updateForm.address1;
    this.updateUser.address2 = this.updateForm.address2;
    this.updateUser.zipcode = this.updateForm.zipcode;
    localStorage.setItem('patient', JSON.stringify(this.updateUser));
    this.modalService.close(this.myForm.value);
    location.reload();
  }
}


