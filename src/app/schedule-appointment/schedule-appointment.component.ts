import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {

   }
   days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
   times = ['9:00', '10:00', '11:00', '1:00', '2:00', '3:00', '4:00'];
  ngOnInit() {

  }

  onSubmit() {
   let e = (document.getElementById('daySelector')) as HTMLSelectElement;
   let sel = e.selectedIndex;
   let opt = e.options[sel];

   console.log(opt.text);
  }
}
