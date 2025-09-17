import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/userservice.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  implements OnInit {
  users: any[] = [];
  searchText:string = '';
  private unsubscribe$: Subject<void> = new Subject<void>();
  UserEmailSearch:string='';
  UsearchPhoneSearch: string='';
  UserNameSearch: string='';
 

  constructor(private UserService: UserService,private router:Router) { }

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


  onSearchTextChange() {
    this.UserService.searchuser(this.searchText);
  }


  gotoadduser(){
    let url = `mainnav/(mainnav:user-add)`;
    this.router.navigateByUrl(url)
  }

  onedituser(id:number)
  {
    console.log('Selected User:', id);
      this.UserService.onedituser(id).subscribe(
        {
          next:(response) => {
            console.log('User selected successfully:',response);
           
           
            let url = `mainnav/(mainnav:user-update)`;
            this.router.navigateByUrl(url, { state: { user: response } });
          },
          error:(error) => {
            console.error('Failed to select User:', error);
            
          }
        }
      );
    }
    onSearchUserEmail(){
      this.UserService.searchuseremail(this.UserEmailSearch)
    }
    onSearchUserPhone(){
      this.UserService.SearchUserPhone(this.UsearchPhoneSearch)
    }
    onSearchUserName(){
      this.UserService.SearchUserName(this.UserNameSearch)

    }

    bookappointment(id:number)
      {
        console.log('Selected User:', id);
          this.UserService.onedituser(id).subscribe(
            {
              next:(response) => {
                console.log('User selected successfully:',response);
               
      let url=`mainnav/(mainnav:doctorpage)`;
      this.router.navigateByUrl(url, { state: { user: response } });
    },
    error:(error) => {
      console.error('Failed to select User:', error);
      
    }
  }
);
  }

  onlogout()
  {
    
    this.router.navigate(['']);
  
  }

}




