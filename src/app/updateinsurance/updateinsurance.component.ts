import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrentUserService } from '../services';
import { ActivatedRoute } from '@angular/router';
import {InsuranceForm} from '../services/insuranceForm';

@Component({
  selector: 'app-updateinsurance',
  templateUrl: './updateinsurance.component.html',
  styleUrls: ['./updateinsurance.component.css']
})
export class UpdateinsuranceComponent implements OnInit {
  myForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  Iform: InsuranceForm;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private userService: CurrentUserService) { }

  ngOnInit() {
    this.createForm();
  }
  private createForm() {
    this.myForm = this.fb.group({
      provider: ['', Validators.required],
      phonenumber: ['', Validators.required],
      policynumber: ['', Validators.required] ,
      type: ['', Validators.required]
    });
  }

  submitForm() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.myForm.invalid) {
        return;
    }
    this.Iform = this.myForm.value;
    console.log(this.Iform + 'Iform');
    this.loading = true;
    this.userService.editInsurance(this.Iform.provider,
                                    this.Iform.phonenumber,
                                    this.Iform.type,
                                    this.Iform.policynumber);
  }
}
