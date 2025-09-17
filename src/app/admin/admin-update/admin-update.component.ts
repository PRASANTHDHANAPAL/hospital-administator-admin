import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/adminservice.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.scss']
})
export class AdminUpdateComponent {

  admins: any = {
    admin_name: '',
    admin_dob: '',
    admin_address: '',
    admin_emailId: '',
    admin_phone: ''
  };
  
  

  
  constructor(private router: Router,private adminService: AdminService,private toaster:ToastrService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.admins = navigation.extras.state['admin'];
      
      console.log(this.admins);
    }
  }
  backtoadminlist(){
    let url=`mainnav/(mainnav:admin-list)`;
    this.router.navigateByUrl(url)
  }
  

  updateAdmin(id: number): void {
    this.adminService.updateAdmin(id, this.admins)
      .subscribe({
        next: response => {
          console.log('Admin Edited successfully:', response);
          this.toaster.success("Updated Sucessfully")
          this.backtoadminlist()
          
        },
        error: error => {
          console.error('Error Editing Admin:', error);
        }
      });
  }
  


}