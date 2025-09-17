import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultationService } from 'src/app/consultation.service';
import { DoctorService } from 'src/app/doctorservice.service';



interface DayConsultation {
  con_id:string;
  doc_id: string;
  day: string;
  session: string;
  start_time: string;
  end_time: string;
  docname:string;
}

@Component({
  selector: 'app-update-doctor-consultation',
  templateUrl: './update-doctor-consultation.component.html',
  styleUrls: ['./update-doctor-consultation.component.scss']
})
export class UpdateDoctorConsultationComponent {

  formData: DayConsultation[] = [
    
    // {day: 'Monday', session: 'Morning', start_time: '', end_time: '', doc_id:'',docname:' ',con_id:'consultation.con_id'},
    // { day: 'Monday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:''},
    // { day: 'Monday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:'' ,con_id:''},
    // { day: 'Tuesday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:''},
    // { day: 'Tuesday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:'' },
    // { day: 'Tuesday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:'' ,con_id:''},
    // { day: 'Wednesday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:'' },
    // { day: 'Wednesday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:'' },
    // { day: 'Wednesday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:''},
    // { day: 'Thursday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:'' },
    // { day: 'Thursday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'' ,con_id:''},
    // { day: 'Thursday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:''},
    // { day: 'Friday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:''},
    // { day: 'Friday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:'' },
    // { day: 'Friday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:''},
    // { day: 'Saturday', session: 'Morning', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:''},
    // { day: 'Saturday', session: 'Afternoon', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:'' },
    // { day: 'Saturday', session: 'Evening', start_time: '', end_time: '',  doc_id:'',docname:'',con_id:'' }
    
  ];
  isFormValid: boolean = true;
  doc_id: any;
  doctor: any;
  constructor(private router: Router,private doctorservice:DoctorService,
    private conService:ConsultationService,private toastr:ToastrService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.doctor = navigation.extras.state['doctor'];
      console.log("doctor of values",this.doctor)
      if (this.doctor && this.doctor.consultations) {
        this.formData = this.doctor.consultations.map((consultation: any) => ({
          day: consultation.day,
          session: consultation.session,
          start_time: consultation.start_time,
          end_time: consultation.end_time,
          con_id:consultation.con_id
          
          
        }
      ));
      }
      
      console.log(this.doctor);
      if (this.doctor.consultations) {
        this.doctor.consultations.forEach((consultation: any, index: number) => {
          console.log(`Consultation ${index + 1} Start Time:`, consultation.start_time);
        });
      }
    }
    console.log('Doctor:', this.formData);
    
  }
  

  allFieldsEmpty(): boolean {
    for (const item of this.formData) {
      if (item.start_time || item.end_time) {
        return false; 
      }
    }
    return true; 
  }
  backto(){
    let url = `mainnav/(mainnav:consultationlist)`;  
    this.router.navigateByUrl(url)
  }
 
  onupdate(con__id:string): void {
   
    
    const formattedData = this.formatConsultationData(this.formData);

   console.log('values to backend',formattedData)

    this.conService.update_consultations(formattedData,this.doctor.doc_id).subscribe({
      next: response => {
        console.log('Consultation created successfully:', response);

        this.toastr.success('Consultation Created Successfully');
        this.backto();

        
      },
      error: error => {
        console.error('Error creating Consultation:', error);
       
      
      }
    });
  }

  private formatConsultationData(formData: DayConsultation[]): { data: DayConsultation[] } {
    return { data: formData };
  }
  
}
