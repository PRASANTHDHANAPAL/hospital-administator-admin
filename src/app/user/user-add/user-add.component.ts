import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService} from 'src/app/userservice.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  
  formData: any={
    name:"",
    dob:"",
    address:"",
      emailId:"",
      password:"",
      phone:"",
  };
  isFormValid: boolean = true;
  constructor(private router:Router,private UserService:UserService,private toastr: ToastrService,){}
  backtouserlist(){
    let url = `mainnav/(mainnav:user-list)`;
    this.router.navigateByUrl(url)
  }


  
  isValidNameLength(name: string): boolean {
    return name.length >= 4;
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
  return true; 
}

  createuser(): void {

    this.isFormValid = true;
    switch (true) {
      case !this.isValidNameLength(this.formData.name):
        this.toastr.error('Please enter your Name.', 'Error', {
          positionClass: 'toast-bottom-center'
        });
        break;
    
     
    
      case !this.formData.dob:
        this.toastr.error('Please enter your Dob.', 'Error', {
          positionClass: 'toast-bottom-center'
        });
        break;
    
      case !this.isValidAddress(this.formData.address):
        this.toastr.error('Please enter your Address.', 'Error', {
          positionClass: 'toast-bottom-center'
        });
        break;
    
      case !this.formData.password:
        this.toastr.error('Please enter your Password.', 'Error', {
          positionClass: 'toast-bottom-center'
        });
        break;
    
      case !this.isValidEmail(this.formData.emailId):
        this.toastr.error('Please enter a valid Gmail address.', 'Error', {
          positionClass: 'toast-bottom-center'
        });
        break;
    
      case !this.isValidPhoneNumber(this.formData.phone):
        this.toastr.error('Please enter a valid 10-digit phone number.', 'Error', {
          positionClass: 'toast-bottom-center'
        });
        break;

        case this.allFieldsEmpty():
          console.log('All fields are empty'); 
          this.toastr.error('All fields are empty.', 'Error', {
            positionClass: 'toast-bottom-center'
          });
          break;
    
        }
        
        if (this.allFieldsEmpty()) {
          this.isFormValid = false;
         
        }
    
        if (this.isFormValid) {
      console.log("sucess")
          this.UserService.createUser(this.formData)
            .subscribe({
              next: response => {
                console.log('User created successfully:', response);
                this.formData = {};
                this.toastr.success("Subscriber Created Successfully");
                this.backtouserlist();
              },
              error: error => {
                console.error('Error creating user:', error);
              }
            });
        }
      }
    }