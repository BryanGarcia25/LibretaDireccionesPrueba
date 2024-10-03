import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Contact } from '../../models/contact.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIcon, MatButtonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'notes', 'birthday', 'website', 'company', 'options'];
  totalContacts: number = 0
  contacts = new MatTableDataSource<Contact>([]);
  filterInput = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.getContacts(0, 10);
    this.filterInput.valueChanges.pipe(startWith(''), map(value => this.contacts.filter = value!.trim().toLowerCase())).subscribe();
  }

  getContacts(pageNumber: number, pageSize: number) {
    this.contactService.getAllContacts(pageNumber, pageSize).subscribe({
      next: (response) => {
        console.log(response);
        
        this.contacts.data = response.data
        this.totalContacts = response.total
      },
      error: (error) => {
        alert(`Error en el servidor ${error}`)
      }
    });
  }

  onChangePage(event: PageEvent) {
    this.getContacts(event.pageIndex, event.pageSize)
  }

  navigateToRegister() {
    this.router.navigate(['/registro'])
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
        this.getContacts(0, 10)
      },
      error: (error) => {
        alert(`Error al momento de eliminar contacto ${error}`)
      }
    })
  }
}