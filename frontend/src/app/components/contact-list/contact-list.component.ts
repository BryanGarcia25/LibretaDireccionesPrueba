import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Contact } from '../../models/contact.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { map, startWith } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'notes', 'birthday', 'website', 'company', 'options'];
  contacts = new MatTableDataSource<Contact>([]);
  filterInput = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contactService: ContactService, private router: Router) {}

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

    this.filterInput.valueChanges.pipe(startWith(''), map(value => this.contacts.filter = value!.trim().toLowerCase())).subscribe();
  }

  navigateToEdit(id: string) {
    this.router.navigate([`/editar/${id}`])
  }

  navigateToDetails(id: string) {
    this.router.navigate([`/detalles/${id}`])
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe({
      next: (response) => {
        alert(response)
      },
      error: (error) => {
        alert(`Error al momento de eliminar contacto ${error}`)
      }
    })
  }
}