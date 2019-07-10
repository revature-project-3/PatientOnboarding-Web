import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services';
import { EdituserComponent } from '../edituser/edituser.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleAppointmentComponent } from '../schedule-appointment/schedule-appointment.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Patient Onboarding';
  currentUser: any;
  navbarOpen = false;
  constructor(private mod: NgbModal, private router: Router, private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  openFormModal() {
    const modalRef = this.mod.open(EdituserComponent);
    modalRef.componentInstance.id = 10; // should be the id

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  openAppModal() {
    const modalRef = this.mod.open(ScheduleAppointmentComponent);
    modalRef.componentInstance.id = 15;
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
