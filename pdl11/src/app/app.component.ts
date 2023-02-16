import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from './authentication/services.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Patient Data Management';
  constructor(
    public authService: ServicesService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
      sessionStorage.removeItem('key')

    });
  }
  ngOnInit() {
   



 
}
}