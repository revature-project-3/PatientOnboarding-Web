import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { EdituserComponent } from './edituser/edituser.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { TestComponent } from './test/test.component';
import { DemoMaterialModule } from 'src/material-module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulerModule } from 'angular-calendar-scheduler';
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
    ScheduleAppointmentComponent,
    TestComponent
  ],
  exports: [
    DemoMaterialModule
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),

    RouterModule.forRoot([
      { path: 'home', component: HomePageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'appointment', component: ScheduleAppointmentComponent },
      { path: 'test', component: TestComponent},
      { path: '', component: HomePageComponent}
    ], { onSameUrlNavigation: 'reload' })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EdituserComponent
  ]
})
export class AppModule { }
