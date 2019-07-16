import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IUser } from './User';
import { zip } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/user`);
    }
    getById(id) {
        const payload = new HttpParams()
            .set('user_id', id);
        return this.http.post<IUser>(`${environment.apiUrl}/user/getUserById`, payload);
    }
    register(username, password, fullName, email) {
        const payload = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('fullname', fullName)
            .set('email', email);
        console.log(payload);
        return this.http.post(`${environment.apiUrl}/auth/registerUser`, payload);
    }

    delete(id) {
        return this.http.delete(`${environment.apiUrl}/user/${id}`);
    }
    resetPw(email) {
        const payload = new HttpParams()
            .set('email', email);
        return this.http.post(`${environment.apiUrl}/resetPassword`, payload);
    }

    updateUser(fullName, phonenumber, birthday, email, city, state, address1, address2, zipcode) {
        const payload = new HttpParams()
            .set('fullname', fullName)
            .set('birthday', birthday)
            .set('email', email)
            .set('city', city)
            .set('state', state)
            .set('phonenumber', phonenumber)
            .set('address1', address1)
            .set('address2', address2)
            .set('zipcode', zipcode);
        console.log(payload);
        return this.http.post(`${environment.apiUrl}/patient/patientdemo`, payload);
    }
    getAppointment(date, time) {
      console.log('date: ' + date);
      console.log('Time: ' + time);
      const payload = new HttpParams()
        .set('date', date)
        .set('time', time);
      return this.http.post(`${environment.apiUrl}/appointment/getAppointment`, payload);
    }
}

