import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/appointment.service';
import * as moment from 'moment';
import { Consultation } from '../appointment-list/appointmentdto';


@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.scss']
})
export class AppointmentAddComponent {
  sessions = ['morning', 'afternoon', 'evening'];
  formData: any={
     name:"",
    date:"",
  
    session:"",
    page:"",
    phone:"",
    userId: "",  
    con_id: "" ,  
  };

  isFormValid: boolean = true;
  doctor: any;
  user: any;
  dayOfWeek: string='';
  consultations: any[]=[];
  selectedSession: string='';
  session: any;
  sessiontime: any[]=[];
  sessionDetails: Consultation[] = [];
  filteredConsultation: any;
  

  constructor(private router:Router,private appointmentservice: AppointmentService,private toastr:ToastrService){
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
      this.doctor = navigation.extras.state['doctor'];

   
      console.log('User:', this.user);
      console.log('Doctor:', this.doctor);
      this.formData.userId = this.user?.id;
   
    }
  
  } 
  findDayOfWeek(date: string): void {
    const enteredDate = moment(date, 'YYYY/MM/DD');
    this.dayOfWeek = enteredDate.isValid() ? enteredDate.format('dddd') : '';
    console.log('Entered date:', date);
    console.log('Day of the week:', this.dayOfWeek);
    if (this.doctor && this.doctor.doc_id) {
      this.appointmentservice.getDayConsultation(this.doctor.doc_id, this.dayOfWeek).subscribe({
        next: (response) => {
          console.log('Consultations for selected day:', response);
          this.consultations = response.consultations;
          this.filterConsultation();
        },
        error: (error) => {
          console.error('Failed to get consultations for selected day:', error);
        }
      });
    } else {
      console.error('No doctor selected.');
    }
  }


 
  backto(){
    let url = `mainnav/(mainnav:appointment-list)`;
    this.router.navigateByUrl(url)
  }


   
  isValidNameLength(name: string): boolean {
    return name.length <= 3;
}
  isValidAddress(address:string):boolean{
    return address.length >=5;
  }
isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/; 
  return emailRegex.test(email);
}

isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\d{10}$/; 
  return phoneRegex.test(phone);
}

allFieldsEmpty(): boolean {
  for (const key in this.formData) {
    console.log(`${key}: ${this.formData[key]}`);
    if (this.formData.hasOwnProperty(key) && this.formData[key]) {
      return false; 
    }
  }
  return true; 
}

  createAppointment(): void {
this.isFormValid = true; 
  
  if (!this.isValidNameLength(this.formData.name)) {
    this.isFormValid = false;
    this.toastr.error('Please enter your Name.', 'Error', {
      positionClass: 'toast-bottom-center',timeOut: 900
    });
    return;
  }


  if (this.allFieldsEmpty()) {
    this.isFormValid = false;
    this.toastr.error('All fields are empty.', 'Error', {
      positionClass: 'toast-bottom-center',timeOut: 900
    });
    return;
  }
  
  if (this.isFormValid) {

    this.formData.con_id = this.filteredConsultation ? this.filteredConsultation.con_id : null;
    this.appointmentservice.createAppointment(this.formData)
      .subscribe({
        next: response => {
          console.log('Appointment created successfully:', response);
          this.formData = {};
          this.toastr.success("Appointment  Created Sucessfully")
          this.backto();
        },
        error: error => {
          console.error('Error creating appointment:', error);
        }
      });
  }
}




selectSession(session: string): void {
  this.selectedSession = session;
  this.filterConsultation();
}

filterConsultation(): void {
  console.log('Selected Session:', this.selectedSession);
  this.filteredConsultation = this.consultations.find(consultation => {
    console.log('Comparing:', consultation.session.toLowerCase(), 'with', this.selectedSession.toLowerCase());
    return consultation.session.toLowerCase() === this.selectedSession.toLowerCase();
  });
  if (!this.filteredConsultation) {
    this.filteredConsultation = { start_time: '' }; 
  }
  console.log('Filtered Consultation:', this.filteredConsultation);
  console.log('Filtered Start Time:', this.filteredConsultation.start_time);
}
}

// selectSession(session: string): void {
//   this.selectedSession = session;

//   if (this.doctor && this.doctor.doc_id&&this.doctor.session) {
//     this.appointmentservice.sendSessionToBackend(this.doctor.doc_id, this.dayOfWeek,this.doctor.session).subscribe({
//       next: (response) => {
//         console.log('Consultations for selected day:', response);
//         this.consultations = response;
//       },
//       error: (error) => {
//         console.error('Failed to get consultations for selected day:', error);
//       }
//     });
//   } else {
//     console.error('No doctor selected.');
//   }
//  }
// }