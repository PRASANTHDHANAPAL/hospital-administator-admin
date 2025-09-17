import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultationService } from 'src/app/consultation.service';

@Component({
  selector: 'app-consultationadd',
  templateUrl: './consultationadd.component.html',
  styleUrls: ['./consultationadd.component.scss']
})
export class ConsultationaddComponent {

  consultation: any={
    day: '',
  session: '',
  start_time: '',
  end_time: '',
  doc_id: ''
  };

  isFormValid: boolean = true;
  constructor(private router:Router,private conService: ConsultationService,private toastr:ToastrService){}
  backtoconsultationlist(){
    let url = `mainnav/(mainnav:consultationlist)`;
    this.router.navigateByUrl(url)
  }



  isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\d{10}$/; 
    return phoneRegex.test(phone);
  }
  allFieldsEmpty(): boolean {
    for (const key in this.consultation) {
      console.log(`${key}: ${this.consultation[key]}`);
      if (this.consultation.hasOwnProperty(key) && this.consultation[key]) {
        return false; 
      }
    }
    return true; 
  }
  



  createconsultation(): void {
    this.isFormValid = true;
    if (this.allFieldsEmpty()) {
      this.isFormValid = false;
      this.toastr.error('All fields are empty.', 'Error', {
        positionClass: 'toast-bottom-center',timeOut: 900
      });
      return;
    }
    
    if (this.isFormValid) {
      const requestData = {
        data: [
          {
            day: this.consultation.day.toLowerCase(),
            session: this.consultation.session,
            start_time: this.consultation.start_time,
            end_time: this.consultation.end_time,
            doc_id: this.consultation.  doc_id
          }
        ]
      };
      this.conService.createconsultation(requestData)
      .subscribe({
        next: response => {
          console.log('Consultation created successfully:', response);
          this.toastr.success("Consultation Created Successfully");
          this.backtoconsultationlist();
        },
        error: error => {
          console.error('Error creating Consultation:', error);
        }
      });
  }
}}