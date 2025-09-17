import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DoctorService } from 'src/app/doctorservice.service';

@Component({
  selector: 'app-doctorpage',
  templateUrl: './doctorpage.component.html',
  styleUrls: ['./doctorpage.component.scss']
})
export class DoctorpageComponent {
  // imageUrl = '/assets/doc2.jpg';
   imageUrl = 'http://localhost:3000/upload-images/'; // URL for imagesC:\Users\Sasidharan K\ws\api-nestjs-svr\uploads\profileimages

  doctors: any[] = [];
  doctorImages: any[] = [];
  selectedDoctor: Object | undefined;
  user: any;
  searchText: string='';
  private unsubscribe$: Subject<void> = new Subject<void>();
  docnamesearch: string='';
  

  constructor(private doctorService: DoctorService, private router: Router,private http: HttpClient) {
    this.fetchDoctors();
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
    this. user = navigation.extras.state['user'];
 
  }
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


  fetchDoctors() {
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  selectDoctor(doc_id: number) {
    console.log('Selected Doctor:', doc_id);

    this.doctorService.selectDoctor(doc_id).subscribe(
      {
        next:(response) => {
          console.log('Doctor selected successfully:',response);
          this.selectedDoctor = response;
          let url=`mainnav/(mainnav:appointment-add)`;
           this.router.navigateByUrl(url, { state:{user:this.user,doctor:response} });  
        },
        error:(error) => {
          console.error('Failed to select doctor:', error);
         
        }
      }
    );
  }
onupdate()
{
  let url=`mainnav/(mainnav:appointment-add)`;
  this.router.navigateByUrl(url);
}
onSearchdocname() {
   
  this.doctorService.searchDoctorname(this.docnamesearch);
}


getDoctors(): void {
  this.http.get<any[]>('http://localhost:3000/doctors').subscribe({
    next:(data) => {
      this.doctorImages = data; // Assign the response to the doctorImages array
    },
    error:(error) => {
      console.error('Error fetching doctors:', error);
    }
});
}

}
