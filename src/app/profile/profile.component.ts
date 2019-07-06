import { Component, OnInit } from '@angular/core';
import { AuthenticationService, CurrentUserService } from '../services';
import { IUser } from '../services/User';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subscription: Subscription;
  logUser: IUser;
  currentUser: IUser;
  bannerImage = 'assets/Cool-Cat-Cropped.jpg';
  userId: number;
  navigationSubscription: Subscription;

  constructor(  private router: Router,
                private route: ActivatedRoute,
                private userService: AuthenticationService,
                private fetchUserService: CurrentUserService
            ) {
    this.currentUser = {
        userId: 0,
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        birthdate: '',
        occupation: '',
        homePhone: '',
        mobilePhone: '',
        address: ''
    };
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.ngOnInit();
        }
      });
  }

  ngOnInit() {
      this.userService.currentUser.subscribe(
        cUser => this.logUser = cUser
      );
      this.userId = +this.route.snapshot.paramMap.get('id');
      console.log(this.userId);
      this.getUser();
  }
  getUser(): void {
      this.currentUser = this.logUser;
    // this.fetchUserService.getById(this.user_id).subscribe(cUser => {
    //     this.currentUser = cUser;
    // });
  }

}
