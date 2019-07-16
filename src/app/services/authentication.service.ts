import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuth } from './UserAuth';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        username = username.toLowerCase();
        const payload = new HttpParams().set('username', username).set('password', password);
        return this.http.post<UserAuth>(`${environment.apiUrl}/auth/authenticate`, payload)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('jwtUser', JSON.stringify(user));
                console.log(JSON.stringify(user));
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

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('jwtUser');
        this.currentUserSubject.next(null);
    }

    setUser(user) {
      let temp = this.currentUserValue;
      temp.user = user;
      localStorage.setItem('jwtUser', JSON.stringify(temp));
      console.log(this.currentUserValue);
    }
}
