import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  private apiUrl = 'http://localhost:8000/api'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) { }

  addContact(data: Contact) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/contact/${id}`);
  }
  
  editContact(id: string, data: Contact) {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, data)
  }

  deleteContact(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}