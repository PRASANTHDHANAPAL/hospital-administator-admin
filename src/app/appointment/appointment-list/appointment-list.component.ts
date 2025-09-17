import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AppointmentService } from 'src/app/appointment.service';
import { AppointmentDto } from './appointmentdto';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent {
  appointments :AppointmentDto[] = [];

  searchText:string = '';
  private unsubscribe$: Subject<void> = new Subject<void>();
  AppointmentAgeSearch: string='';
  AppointmentDateSearch: string='';
  AppointmentNameSearch: string='';
  consulattion: any;
  AppointmentDoctorSearch: string='';


  constructor(private AppointmentService: AppointmentService,private router:Router) { }

  ngOnInit(): void {

    this.AppointmentService.getAppointments().pipe(takeUntil(this.unsubscribe$)).subscribe( inputData => {
      this.appointments = inputData
      this.appointments.forEach(appointment => {
        console.log(appointment.doctor?.docname); // Access each appointment's doctor's docname
      });
    },
    error => {
      console.error('Failed to load appointments:', error);
      this.appointments = []; // Fallback to an empty array on error
    }
  );
        
 

    this.AppointmentService.searchAppointments(this.searchText);

      console.log('ngOnInit -appointment');
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('ngOnDestroy -appointment')

  }


  onSearchTextChange() {
    this.AppointmentService.searchAppointments(this.searchText);
    
  }
  goToAddappoinment(){
    let url=`mainnav/(mainnav:select-subscriber)`;
    this.router.navigateByUrl(url)
  }

  oneditappointment(id:any)
  {
    console.log('Selected Appointment:', id);
    this.AppointmentService.oneditappointment(id).subscribe(
      {
        next:(response) => {
          console.log('Appointment selected successfully:',response);
         let url=`mainnav/(mainnav:appointment-update)`;
   
          this.router.navigateByUrl(url, { state: { appointment: response } });
       
         
        },
        error:(error) => {
          console.error('Failed to select appointment:', error);
          
        }
      }
    );
  }
  onAppointmentDoctorSearch(){console.log("Search Term: ", this.AppointmentDoctorSearch);

    this.AppointmentService. DoctorSearch(this.AppointmentDoctorSearch)
    
  }
  
  onAppointmentDateSearch(){
    this.AppointmentService.Appointmentdatesearch(this.AppointmentDateSearch)
    console.log(this.AppointmentDateSearch)
  }
  onAppointmentNameSearch(){
    this.AppointmentService.PatientNameSearch(this.AppointmentNameSearch)
    
  }
  onlogout()
  {
    
    this.router.navigate(['']);

  }

  }

