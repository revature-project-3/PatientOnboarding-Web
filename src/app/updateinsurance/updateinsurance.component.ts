import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-updateinsurance',
  templateUrl: './updateinsurance.component.html',
  styleUrls: ['./updateinsurance.component.css']
})
export class UpdateinsuranceComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  private createForm() {
    this.myForm = this.fb.group({
      provider: '',
      phonenumber: '',
      policynumber: '',
      type: ''
    });
  }
}
