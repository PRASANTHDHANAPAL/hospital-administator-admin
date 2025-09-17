import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { DoctorAddComponent } from './doctor/doctor-add/doctor-add.component';
import { DoctorUpdateComponent } from './doctor/doctor-update/doctor-update.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { AppointmentAddComponent } from './appointment/appointment-add/appointment-add.component';
import { AppointmentUpdateComponent } from './appointment/appointment-update/appointment-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DoctorpageComponent } from './appointment/doctorpage/doctorpage.component';
import { LoginComponent } from './login/login.component';
import { MainnavComponent } from './mainnav/mainnav.component';
import { ConsultationlistComponent } from './consultation/consultationlist/consultationlist.component';
import { ConsultationaddComponent } from './consultation/consultationadd/consultationadd.component';
import { ConsultationupdateComponent } from './consultation/consultationupdate/consultationupdate.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ConsultationDoctorComponent } from './consultation-doctor/consultation-doctor.component';
import { SelectSubscriberComponent } from './appointment/select-subscriber/select-subscriber.component';
import { UpdateDoctorConsultationComponent } from './doctor/update-doctor-consultation/update-doctor-consultation.component';
import { WarningComponent } from './warning/warning.component';




@NgModule({
  declarations: [
    AppComponent,
    
   AdminListComponent,
  
    AdminAddComponent,
    AdminUpdateComponent,
    DoctorListComponent,
    DoctorAddComponent,
    DoctorUpdateComponent,
    UserListComponent,
    UserAddComponent,
    UserUpdateComponent,
    AppointmentListComponent,
    AppointmentAddComponent,
    AppointmentUpdateComponent,
    DoctorpageComponent,
    LoginComponent,
    MainnavComponent,
    ConsultationlistComponent,
    ConsultationaddComponent,
    ConsultationupdateComponent,
    ConsultationDoctorComponent,
    SelectSubscriberComponent,
    UpdateDoctorConsultationComponent,
    WarningComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
