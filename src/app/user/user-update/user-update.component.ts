import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/userservice.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {
  user: any ={
    name:"",
    dob:"",
    address:"",
      emailId:"",
      password:"",
      phone:"",

  };

  
  constructor(private router: Router,private userservice:UserService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
      
      console.log(this.user);
    }
  }
  backtouserlist(){
    let url = `mainnav/(mainnav:user-list)`;
    this.router.navigateByUrl(url)
  }
  updateuser(id: number): void {
    this. userservice.updateuser(id, this.user)
      .subscribe({
        next: response => {
          console.log('Doctor Edited successfully:', response);
          this.  backtouserlist();
          
        },
        error: error => {
          console.error('Error Editing Doctor', error);
        }
      });
  }
 
  }


