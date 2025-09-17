import { Component } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements CanActivate {
  title = 'Care Connect';

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1439) {
      return this.router.parseUrl('/warning'); // Redirect to warning page
    }
    return true; // Allow access
  }
}
