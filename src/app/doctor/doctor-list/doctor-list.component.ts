import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/doctorservice.service';
import { DoctorsDto } from '../doctordto';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent  implements OnInit {
  
  searchText:string = '';
  doctors:DoctorsDto[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();
  docnamesearch: string='';
  specalist: string='';


  constructor(private doctorService:DoctorService,private router:Router) {

  }

  ngOnInit(): void {

    this.doctorService.getDoctorData().pipe(takeUntil(this.unsubscribe$)).subscribe( inputData => {
      this.doctors = inputData
    })

    this.doctorService.searchDoctor(this.searchText);
    // this.doctorService.searchDoctorname(this.docnamesearch);
    // this.doctorService.searchDoctorspecialist(this.specalist);
    console.log(this.searchText)
      console.log('ngOnInit - doctor')
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('ngOnDestroy  - doctor')

  }


  onSearchTextChange() {
    this.doctorService.searchDoctor(this.searchText);
  }
  
  onSearchdocname() {
   
    this.doctorService.searchDoctorname(this.docnamesearch);
  }
  onSearchspecialist() {
   
    this.doctorService.searchDoctorspecialist(this.specalist);

    console.log(this.specalist)
  }




  oneditdoctor(doc_id:any){
    {
      console.log('Selected Doctor:', doc_id);
      this.doctorService.oneditdoctor(doc_id).subscribe(
        {
          next:(response) => {
            console.log('Doctor selected successfully:',response);
            let url = `mainnav/(mainnav:doctor-update)`;  
            this.router.navigateByUrl(url, { state: { doctor: response } });
          },
          error:(error) => {
            console.error('Failed to select doctor:', error);
            
          }
        }
      );
    }
}
onaddoctor(){
  let url = `mainnav/(mainnav:doctor-add)`;
    this.router.navigateByUrl(url)

}

onupdateconsultations(doc_id:any){


  this.doctorService.getdocotorConsultations(doc_id).subscribe(
    {
      next:(response) => {
        console.log('Doctor Details:', response);
        
        let url = `mainnav/(mainnav:update-doctor-consultation)`;
        this.router.navigateByUrl(url, { state: { doctor: response } });
        
      },
      error:(error) => {
        console.error('Failed to select doctor:', error);
        
      }
    }
  );
}

onlogout()
{
  
  this.router.navigate(['']);

}

}
