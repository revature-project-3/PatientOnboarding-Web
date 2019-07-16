import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CurrentUserService } from '../services';
import { Appointment } from '../services/appointment';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent implements OnInit {
  myForm: FormGroup;
  appointment: Appointment;
  constructor(private fb: FormBuilder, private userService: CurrentUserService) {

   }
   days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
   times = ['9:00', '10:00', '11:00', '1:00', '2:00', '3:00', '4:00'];
  ngOnInit() {

  }

  onSubmit() {
    let e = (document.getElementById('daySelector')) as HTMLSelectElement;
    let sel = e.selectedIndex;
    let dayopt = e.options[sel];
    let t = (document.getElementById('timeSelector')) as HTMLSelectElement;
    let selt = t.selectedIndex;
    let timeopt = t.options[selt];

    console.log(dayopt.text);
    this.userService.getAppointment(dayopt.text, timeopt.text).subscribe(data => {
      console.log(data);
      this.appointment = data as Appointment;
    });
  }
}
