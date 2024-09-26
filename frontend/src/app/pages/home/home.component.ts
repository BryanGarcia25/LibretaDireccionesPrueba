import { Component } from '@angular/core';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactListComponent, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/registro'])
  }
}
