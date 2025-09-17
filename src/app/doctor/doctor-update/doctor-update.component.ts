import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/doctorservice.service';

@Component({
  selector: 'app-doctor-update',
  templateUrl: './doctor-update.component.html',
  styleUrls: ['./doctor-update.component.scss']
})
export class DoctorUpdateComponent {

  doctor: any = {
    docname: '',
    dob: '',
    address: '',
    specalist: '',
    docemailId: '',
    phonenumber: ''
    
  };
  
  constructor(private router: Router,private doctorservice:DoctorService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.doctor = navigation.extras.state['doctor'];
      
      console.log(this.doctor);
    }
  }
  backtodoctorlist(){
    let url = `mainnav/(mainnav:doctor-list)`;  
    this.router.navigateByUrl(url)
  }
  updatedoctor(id: any): void {
    
    this.doctorservice.upadtedoctor(id, this.doctor)
    
      .subscribe({
        next: response => {
          console.log('Doctor Edited successfully:', response);
          this.  backtodoctorlist();
          
        },
        error: error => {
          console.error('Error Editing Doctor', error);
        }
      });
  }
}
