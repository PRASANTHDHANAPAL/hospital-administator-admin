import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AppointmentService } from 'src/app/appointment.service';
import { UserDTO } from 'src/app/user/userdto';
import { UserService } from 'src/app/userservice.service';

@Component({
  selector: 'app-select-subscriber',
  templateUrl: './select-subscriber.component.html',
  styleUrls: ['./select-subscriber.component.scss']
})
export class SelectSubscriberComponent implements OnInit {
  users: any[] = [];
  UserEmailSearch: string='';
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private userService: UserService, private router: Router,private appointmentservice:AppointmentService,private UserService: UserService) {

  }


  ngOnInit(): void {

    this. UserService.getUserData().pipe(takeUntil(this.unsubscribe$)).subscribe( inputData => {
      this.users = inputData
    })

    this.UserService.searchuseremail(this.UserEmailSearch);

      console.log('ngOnInit - User')
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('ngOnDestroy  - User')

  }

  onselectSubscriber(id:number){
          console.log('Selected Subscriber:', id);
      this.appointmentservice.onSeletectedSubscriber(id).subscribe(
        {
          next:(user) => {

            console.log('Subscriber selected successfully:',user);
            this.appointmentservice.setSelectedSubscriber(user);
        
      let url=`mainnav/(mainnav:doctorpage)`;
      this.router.navigateByUrl(url,{ state: {user:user  } })
     
          },
          error:(error) => {
            console.error('Failed to select admin:', error);
            
          }
        }
      );
      
    } 
    onSearchUserEmail(){
      this.UserService.searchuseremail(this.UserEmailSearch)
    }

  }
