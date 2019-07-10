import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.myForm = this.fb.group({
      chosenDate: [ '', Validators.required ]
    });
    this.myForm.setValue({
      chosenDate: new Date(2017, 4, 1)
    });
  }
  private createForm() {
    this.myForm = this.fb.group({
      firstName: '',
      lastName: '',
      password: '',
      city: ''
    });
  }
  onSubmit() {
    console.log(this.myForm.get('chosenDate'));
  }
}
