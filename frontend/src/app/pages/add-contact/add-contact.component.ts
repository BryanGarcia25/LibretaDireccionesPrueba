import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ContactFormComponent],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {

}
