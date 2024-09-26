import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Contact } from '../../models/contact.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'notes', 'birthday', 'website', 'company'];
  contacts = new MatTableDataSource<Contact>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe({
      next: (response) => {
        this.contacts.data = response;
        this.contacts.paginator = this.paginator;
      },
      error: (error) => {
        alert(`Error en el servidor ${error}`)
      }
    });
  }
}
