import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUserValue;
        console.log('Intercepted JWT, Testing token!');
        // console.log(currentUser);
        // console.log('CU TOKEN: ' + currentUser.token);
        if (currentUser && currentUser.token) {
          console.log(currentUser.token);
          request = request.clone({
                  headers: request.headers.set('Authorization', currentUser.token)
                /*setHeaders: {
                  token: `${currentUser.token}`
                }*/
            });
          console.log('JWT Intercepted');
        }
        console.log('Handling Request');
        return next.handle(request);
    }
}
