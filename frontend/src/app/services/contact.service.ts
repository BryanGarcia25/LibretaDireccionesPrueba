import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  addContact(data: Contact) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  getAllContacts(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams().set('page', pageNumber + 1).set('per_page', pageSize)
    return this.http.get<any>(`${this.apiUrl}/contacts`, { params });
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