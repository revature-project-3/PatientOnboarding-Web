import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuth } from './UserAuth';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    private patient: BehaviorSubject<any>;
    public currentPatient: Observable<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.patient = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('patient')));
        this.currentPatient = this.patient.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }
    public get patientValue() {
      return this.patient.value;
    }
    login(username, password) {
        username = username.toLowerCase();
        const payload = new HttpParams().set('username', username).set('password', password);
        return this.http.post<UserAuth>(`${environment.apiUrl}/auth/authenticate`, payload)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    getusers() {
        return this.http.get<any>(`${environment.apiUrl}/user/getAllUsers`)
            .pipe(map(user => {
                return user;
            }));
    }
    test() {
      console.log('in test');
      const payload = new HttpParams().set('username', 'testUser').set('password', 'testpass');
      return this.http.post<any>(`${environment.apiUrl}/auth/test`, payload)
      .pipe(map(user => {
          console.log('User: ' + user);
          return user;
      }));
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('patient');
        this.currentUserSubject.next(null);
        this.patient.next(null);
    }
}
