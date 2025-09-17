import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/adminservice.service';


@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})

export class AdminAddComponent {
  formData: any={
    admin_name:"",
  };

  constructor(private router:Router,private adminService: AdminService, private toastr:ToastrService){}
  backto(){
    let url = `mainnav/(mainnav:admin-list)`;
    this.router.navigateByUrl(url)
  }


  isValidNameLength(admin_name: string): boolean {
    return admin_name.length >= 4;
}
  isValidAddress(address:string):boolean{
    return address.length >=5;
  }
isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/; 
  return emailRegex.test(email);
}

isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

allFieldsEmpty(): boolean {
  for (const key in this.formData) {
    console.log(`${key}: ${this.formData[key]}`);
    if (this.formData.hasOwnProperty(key) && this.formData[key]) {
      return false; 
    }
  }
  return true;}

  createAdmin(): void {
    switch (true) {
      case !this.isValidNameLength(this.formData.admin_name):
        this.toastr.error('Please enter your Name.', 'Error', {
          positionClass: 'toast-bottom-center',timeOut: 900
        });
        break;
    
     
    
      case !this.formData.admin_dob:
        this.toastr.error('Please enter your Dob.', 'Error', {
          positionClass: 'toast-bottom-center',timeOut: 900
        });
        break;
    
      case !this.isValidAddress(this.formData.admin_address):
        this.toastr.error('Please enter your Address.', 'Error', {
          positionClass: 'toast-bottom-center',timeOut: 900
        });
        break;

        case !this.isValidEmail(this.formData.admin_emailId):
          this.toastr.error('Please enter a valid Gmail address.', 'Error', {
            positionClass: 'toast-bottom-center',timeOut: 900
          });
          break;
      
    
      case !this.formData.admin_password:
        this.toastr.error('Please enter your Password.', 'Error', {
          positionClass: 'toast-bottom-center',timeOut: 900
        });
        break;
    
    
      case !this.isValidPhoneNumber(this.formData.admin_phone):
        this.toastr.error('Please enter a valid 10-digit phone number.', 'Error', {
          positionClass: 'toast-bottom-center',timeOut: 900
        });
        break;

        case this.allFieldsEmpty():
          console.log('All fields are empty'); 
          this.toastr.error('All fields are empty.', 'Error', {
            positionClass: 'toast-bottom-center',timeOut: 900
          });
          break;
    
        }
  

    this.adminService.createAdmin(this.formData)
      .subscribe(
        {
       next: response => {
          console.log('User created successfully:', response);
          
          this.formData = {};
          this.toastr.success("Admin Created Sucessfully")
          this.backto();
        },
        error:error => {
          console.error('Error creating user:', error);
        }}
      );
    


  
}}