import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';

import { AdminUpdateComponent } from './admin/admin-update/admin-update.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { DoctorAddComponent } from './doctor/doctor-add/doctor-add.component';
import { DoctorUpdateComponent } from './doctor/doctor-update/doctor-update.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { AppointmentAddComponent } from './appointment/appointment-add/appointment-add.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { AppointmentUpdateComponent } from './appointment/appointment-update/appointment-update.component';
import { DoctorpageComponent } from './appointment/doctorpage/doctorpage.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainnavComponent } from './mainnav/mainnav.component';
import { ConsultationlistComponent } from './consultation/consultationlist/consultationlist.component';
import { ConsultationaddComponent } from './consultation/consultationadd/consultationadd.component';
import { ConsultationupdateComponent } from './consultation/consultationupdate/consultationupdate.component';
import { ConsultationDoctorComponent } from './consultation-doctor/consultation-doctor.component';
import { SelectSubscriberComponent } from './appointment/select-subscriber/select-subscriber.component';
import { UpdateDoctorConsultationComponent } from './doctor/update-doctor-consultation/update-doctor-consultation.component';
import { WarningComponent } from './warning/warning.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'mainnav',
    component: MainnavComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin-list',
        outlet: 'mainnav',
      },
      {
        path: 'admin-list',
        component: AdminListComponent,
        outlet: 'mainnav',
      },
      {
        path: 'doctor-list',
        component: DoctorListComponent,
        outlet: 'mainnav',
      },
      {
        path: 'user-list',
        component: UserListComponent,
        outlet: 'mainnav',
      },
      {
        path: 'appointment-list',
        component: AppointmentListComponent,
        outlet: 'mainnav',
      },
      {
        path: 'admin-add',
        component: AdminAddComponent,
        outlet: 'mainnav',
      },

      {
        path: 'admin-update',
        component: AdminUpdateComponent,
        outlet: 'mainnav',
      },

      {
        path: 'doctor-add',
        component: DoctorAddComponent,
        outlet: 'mainnav',
      },
      {
        path: 'doctor-update',
        component: DoctorUpdateComponent,
        outlet: 'mainnav',
      },

      {
        path: 'user-add',
        component: UserAddComponent,
        outlet: 'mainnav',
      },
      {
        path: 'user-update',
        component: UserUpdateComponent,
        outlet: 'mainnav',
      },
      {
        path: 'appointment-add',
        component: AppointmentAddComponent,
        outlet: 'mainnav',
      },

      {
        path: 'appointment-update',
        component: AppointmentUpdateComponent,
        outlet: 'mainnav',
      },
      {
        path: 'doctorpage',
        component: DoctorpageComponent,
        outlet: 'mainnav',
      },
      {
        path: 'consultationlist',
        component: ConsultationlistComponent,
        outlet: 'mainnav',
      },
      {
        path: 'consultationadd',
        component: ConsultationaddComponent,
        outlet: 'mainnav',
      },
      {
        path: 'consultationupdate',
        component: ConsultationupdateComponent,
        outlet: 'mainnav',
      },
      {
        path: 'consultation-doctor',
        component: ConsultationDoctorComponent,
        outlet: 'mainnav',
      },
      {
        path: 'select-subscriber',
        component: SelectSubscriberComponent,
        outlet: 'mainnav',
      },
      {
        path: 'update-doctor-consultation',
        component: UpdateDoctorConsultationComponent,
        outlet: 'mainnav',
      },
    ],
  },
  {
    path: 'warning',
    component: WarningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
