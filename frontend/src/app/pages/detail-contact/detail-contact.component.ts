import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-detail-contact',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './detail-contact.component.html',
  styleUrl: './detail-contact.component.css'
})
export class DetailContactComponent implements OnInit {
  detailContact: Contact = {
    id: '',
    name: '', 
    notes: '', 
    birthday: new Date(),
    website: '',
    company: '',
    phones: [],
    emails: [],
    addresses: []
  };

  constructor(private contactService: ContactService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.contactService.getContactById(this.route.snapshot.paramMap.get('id')!).subscribe({
      next: (response) => {
        this.detailContact = response;
      },
      error: (error) => {
        alert(`Error al obtener contacto ${error}`)
      }
    })
  }

}
