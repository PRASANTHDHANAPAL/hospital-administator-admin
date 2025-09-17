import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/appointment.service';

@Component({
  selector: 'app-appointment-update',
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.scss'],
})
export class AppointmentUpdateComponent {
  appointment: any = {
    pname: '',
    date: '',
    time: '',
    page: '',
    phone: '',
    docname: '',
  };
  docname: any;

  constructor(
    private router: Router,
    private appointmentservice: AppointmentService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.appointment = navigation.extras.state['appointment'];
      console.log(this.appointment.consultaion.doc_id);
      this.appointmentservice
        .appoinmentdoctor(this.appointment.consultaion.doc_id)
        .subscribe({
          next: (doctor) => {
            console.log(doctor);
            this.docname = doctor.docname;
          },
          error: (error) => {
            console.error('Failed to fetch doctor details:', error);
          },
        });
    }
  }
  backtoappointmentlist() {
    let url = `mainnav/(mainnav:appointment-list)`;
    this.router.navigateByUrl(url);
  }
  updateAppointment(id: number): void {
    console.log('appointment id===>', id);
    this.appointmentservice.upadteappointment(id, this.appointment).subscribe({
      next: (response) => {
        console.log('Doctor Edited successfully:', response);
        this.backtoappointmentlist();
      },
      error: (error) => {
        console.error('Error Editing Doctor', error);
      },
    });
  }
}
