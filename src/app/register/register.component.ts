import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CurrentUserService, AuthenticationService } from '../services';
import { isBuffer } from 'util';
import { IUser } from '../services/User';
import { RegisterForm } from '../services/registerForm';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;
    regUser: IUser;
    tForm: RegisterForm;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: CurrentUserService
    ) {
        this.regUser = {
            userId: 0,
            username: '',
            password: '',
            email: '',
            fullName: '',
            birthdate: '',
            homePhone: '',
            mobilePhone: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipcode: 0,
        };
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.tForm = this.registerForm.value;
        console.log(this.tForm);
        this.regUser.username = this.tForm.username;
        this.regUser.password = this.tForm.password;
        this.regUser.fullName = this.tForm.firstName + ' ' + this.tForm.lastName;
        this.regUser.email = this.tForm.email;
        console.log(this.regUser);

        this.loading = true;
        this.userService.register(  this.regUser.username,
                                    this.regUser.password,
                                    this.regUser.fullName,
                                    this.regUser.email)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                error => {
                    // this.error = error;
                    this.loading = false;
                });
    }
}
