import { Component, OnInit } from '@angular/core';
import { AuthenticationService, CurrentUserService } from '../services';
import { IUser } from '../services/User';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserAuth } from '../services/UserAuth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subscription: Subscription;
  currentUser: UserAuth;
  navigationSubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: AuthenticationService,
              private fetchUserService: CurrentUserService
  ) {
    this.currentUser = userService.currentUserValue;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      cUser => this.currentUser = cUser
    );
    console.log(this.currentUser);
    // this.getUser();
  }
  getUser(): void {
    // this.fetchUserService.getById(this.user_id).subscribe(cUser => {
    //     this.currentUser = cUser;
    // });
  }

}
