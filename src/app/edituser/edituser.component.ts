import {Component, Input, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import {SelectModule} from 'ng2-select';
import {MyForm} from '../services/myForm';
import {ActivatedRoute} from '@angular/router';
import {CurrentUserService, AuthenticationService} from '../services';
import { IUser } from '../services/User';



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
  updateUser: IUser;

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
              private authServ: AuthenticationService,
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
      birthday: '',
      address1: '',
      address2: '',
      zipcode: '',
      email: '',
      phonenumber: ''
    });
  }
  closeModal() {
    this.modalService.close('Modal Closed');
  }
  private submitForm() {

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
    .subscribe(data => {
      this.authServ.setUser(data);
    });
    this.modalService.close(this.myForm.value);
  }
}


