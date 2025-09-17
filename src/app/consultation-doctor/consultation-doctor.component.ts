import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultationService } from '../consultation.service';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../doctorservice.service';

interface DayConsultation {
  doc_id: string;
  day: string;
  session: string;
  start_time: string;
  end_time: string;
 
  docname:string;
}
@Component({
  selector: 'app-consultation-doctor',
  templateUrl: './consultation-doctor.component.html',
  styleUrls: ['./consultation-doctor.component.scss']
})
export class ConsultationDoctorComponent {
 
  formData: DayConsultation[] = [
    
    {day: 'Monday', session: 'Morning', start_time: '', end_time: '', doc_id:'',docname:''},
    { day: 'Monday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:''},
    { day: 'Monday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:'' },
    { day: 'Tuesday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:''},
    { day: 'Tuesday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'' },
    { day: 'Tuesday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:'' },
    { day: 'Wednesday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:'' },
    { day: 'Wednesday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'' },
    { day: 'Wednesday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:''},
    { day: 'Thursday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:'' },
    { day: 'Thursday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'' },
    { day: 'Thursday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:''},
    { day: 'Friday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:''},
    { day: 'Friday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'' },
    { day: 'Friday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:''},
    { day: 'Saturday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:''},
    { day: 'Saturday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'' },
    { day: 'Saturday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:'' }
    
  ];

  isFormValid: boolean = true;
  constructor(private router: Router,private doctorservice:DoctorService,
    private conService:ConsultationService,private toastr:ToastrService
  ) {
       const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const doc_id = navigation.extras.state['doc_id'];
      const docname = navigation.extras.state['docname'];
      if (doc_id) {

       
        this.formData.forEach(item => {
          item.doc_id = doc_id;
        });
      }
      if (docname) {
       
        this.formData.forEach(item => {
          item.docname = docname;
        });
      }
    }
    
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
  backto(){
    let url = `mainnav/(mainnav:consultationlist)`;  
    this.router.navigateByUrl(url)
  }
 
  onsubmit(): void {
    this.isFormValid = true;
    if (this.allFieldsEmpty()) {
      this.isFormValid = false;
      this.toastr.error('All fields are empty.', '', {
        positionClass: 'toast-bottom-center',timeOut: 900
      });
      return;
    }
    
    const formattedData = this.formatConsultationData(this.formData);

   
    this.conService.create_consultations(formattedData).subscribe({
      next: response => {
        console.log('Consultation created successfully:', response);
        this.toastr.success('Consultation Created Successfully');
        this.backto();

        
      },
      error: error => {
        console.error('Error creating Consultation:', error);
        this.toastr.error('Pls Fill all the Feilds','Error',{positionClass: 'toast-bottom-center',timeOut: 900}

        );
      
      }
    });
  }

  private formatConsultationData(formData: DayConsultation[]): { data: DayConsultation[] } {
    return { data: formData };
  }
}

  

