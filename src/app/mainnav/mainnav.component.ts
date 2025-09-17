import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.scss']
})
export class MainnavComponent {

  menuSelected: number=0;
  constructor(private router:Router) {

  }


  onmenu(menu:number) {
    this.menuSelected = menu;

    switch(menu){

      case 1:
        this.router.navigateByUrl(`mainnav/(mainnav:admin-list)`)
      
        break;
      case 2: 
        this.router.navigateByUrl(`mainnav/(mainnav:doctor-list)`)
      
        break;
      case 3: 
        this.router.navigateByUrl(`mainnav/(mainnav:user-list)`)
      
        break;
      case 4: 
        this.router.navigateByUrl(`mainnav/(mainnav:appointment-list)`)
      
        break;

        case 5: 
        this.router.navigateByUrl(`mainnav/(mainnav:consultationlist)`)
      
        break;
    }

    
  }
  onlogout()
{
  
  this.router.navigate(['']);

}
}

