import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../adminservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
   
  @ViewChild('SIF') signinForm: NgForm | null = null;
  constructor(private router:Router,private adminservice:AdminService){}

onlogin(){

    console.log('dump => ', this.signinForm?.value);

    let emailId = this.signinForm?.value.email;
    let password = this.signinForm?.value.password;
    if (!emailId || !password) {
      console.error('Email and password are required');
      return;
  }
    this.adminservice.signIn(emailId, password).subscribe(
      {
        next: (x) => {
          console.log(' success data result ', x);
          let url = `mainnav/(mainnav:admin-list)`;
          this.router.navigateByUrl(url)

     
        },
        error: (err) => {
          console.error('error ', err);
        }
      }
    );
}
}
 




