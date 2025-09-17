import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConsutationtimeDto } from './consultationdto';
import { ConsultationService } from 'src/app/consultation.service';




@Component({
  selector: 'app-consultationlist',
  templateUrl: './consultationlist.component.html',
  styleUrls: ['./consultationlist.component.scss']
})

export class ConsultationlistComponent {
  
  
  
  searchText:string = '';
  private unsubscribe$: Subject<void> = new Subject<void>();
  consultation: ConsutationtimeDto []=[];
  ConsultationDateSearch: string='';
  ConsultationDaySearch: string='';
  ConsultationSessionSearch: string='';
  consultations: ConsutationtimeDto[]=[];

  constructor(private ConsultationService: ConsultationService,private router:Router) { }

  ngOnInit(): void {

    this.ConsultationService.getConsultationData().pipe(takeUntil(this.unsubscribe$)).subscribe( inputData => {
      this.consultations = inputData
      console.log(inputData)
    })

   
    this.ConsultationService.DateSearch(this.ConsultationDateSearch);
    // this.onConsultationDateSearch();
      console.log('ngOnInit -consultation')
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('ngOnDestroy -consultation')

  }



  goToAddconsultation(){
    let url=`mainnav/(mainnav:consultationadd)`;
    this.router.navigateByUrl(url)
  }
  oneditconsultation(id:any)
  {
    console.log('Selected Appointment:', id);
    this.ConsultationService.oneditconsultation(id).subscribe(
      {
        next:(response) => {
          console.log('Appointment selected successfully:',response);
         
         let url=`mainnav/(mainnav:consultationupdate)`;
          this.router.navigateByUrl(url, { state: { consultation: response } });
        },
        error:(error) => {
          console.error('Failed to select appointment:', error);
          
        }
      }
    );
  }
  onConsultationDateSearch(){
    this.ConsultationService.DateSearch(this.ConsultationDateSearch)
  }

  onConsultationDaySearch(){
    this.ConsultationService.DaySearch(this.ConsultationDaySearch)
  }
  onConsultationSessionSearch(){
    this.ConsultationService.SessionSearch(this.ConsultationSessionSearch)
  }

  onlogout()
  {
    
    this.router.navigate(['']);

  }
}
