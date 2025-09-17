import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/adminservice.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  admins: any[] = [];
  AdminEmailSearch: string='';
  private unsubscribe$: Subject<void> = new Subject<void>();
  AdminPhoneSearch: string='';
  AdminNameSearch: string='';

  
  
  

  constructor(private adminService: AdminService,private router:Router) { }

  ngOnInit(): void {

    this.adminService.getAdminrData().pipe(takeUntil(this.unsubscribe$)).subscribe( inputData => {
      this.admins = inputData
     
   

    })
   
    this.adminService.searchAdminEmail(this.AdminEmailSearch);
    console.log(this.AdminEmailSearch)
      
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('ngOnDestroy -admin')

  }


 
  goToAddUser(){
   let url = `mainnav/(mainnav:admin-add)`;
    this.router.navigateByUrl(url)
  }
  onedit(id:number)
  {
    console.log('Selected Admin:', id);
    this.adminService.onedit(id).subscribe(
      {
        next:(response) => {
          console.log('Admin selected successfully:',response);
          let url = `mainnav/(mainnav:admin-update)`;  
          this.router.navigateByUrl(url, { state: { admin: response } });
        },
        error:(error) => {
          console.error('Failed to select admin:', error);
          
        }
      }
    );
  }
  onSearchAdminEmail() {
    
    this.adminService.searchAdminEmail(this.AdminEmailSearch);
    
    console.log(this.AdminEmailSearch)

  }
  onSearchAdminPhone(){
    this.adminService.searchAdminPhone(this.AdminPhoneSearch);


  }
  onSearchAdminName(){
    this.adminService.seachAdminName(this.AdminNameSearch)
  }
  onlogout()
  {
    
    this.router.navigate(['']);

  }
}