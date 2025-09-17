import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultationService } from 'src/app/consultation.service';

@Component({
  selector: 'app-consultationupdate',
  templateUrl: './consultationupdate.component.html',
  styleUrls: ['./consultationupdate.component.scss']
})
export class ConsultationupdateComponent {

  consultation: any = {

    date:'',
    day:'',
   docname:'',
   session:'',
    doc_id: '',
    start_time:'',
    end_time:'',
    
  };
  
  constructor(private router: Router,private ConsultationService:ConsultationService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.consultation = navigation.extras.state['consultation'];
      
      console.log(this.consultation);
    }
  }
  backtoconsultationlist(){
    let url = `mainnav/(mainnav:consultationlist)`;  
    this.router.navigateByUrl(url)
  }
  updateConsultation(con_id: number): void {
    console.log("Consultation id",con_id)
    
    this.ConsultationService.upadteconsultation(con_id, this.consultation)
      .subscribe({
        next: response => {
          console.log('Consultation Edited successfully:', response);
          this. backtoconsultationlist();
          
        },
        error: error => {
          console.error('Error Editing Consultation', error);
        }
      });
  }
}

