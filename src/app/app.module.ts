import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { EdituserComponent } from './edituser/edituser.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    HomePageComponent,
    MedicalHistoryComponent,
    EdituserComponent,
    ScheduleAppointmentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomePageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', component: HomePageComponent}
    ], { onSameUrlNavigation: 'reload' })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [
    EdituserComponent
  ]
})
export class AppModule { }
