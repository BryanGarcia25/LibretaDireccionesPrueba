import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.contactService.getContactById(id).subscribe({
        next: (response) => {
          console.log(response.phones);
          
          this.contactForm.patchValue({
            name: response.name,
            notes: response.notes,
            birthday: response.birthday,
            website: response.website,
            company: response.company,
          })

          response.phones.forEach((phone) => {
            this.phoneArray.push(this.formBuilder.group({
              phone_number: [phone.phone_number] 
            }))
          })

          response.emails.forEach((email) => {
            this.emailArray.push(this.formBuilder.group({
              email: [email.email] 
            }))
          })

          response.addresses.forEach((address) => {
            this.addressArray.push(this.formBuilder.group({
              address: [address.address] 
            }))
          })
        }
      })
    }

    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      notes: [''],
      birthday: ['', Validators.required],
      website: [''],
      company: ['', Validators.required],
      phones: this.formBuilder.array([]),
      emails: this.formBuilder.array([]),
      addresses: this.formBuilder.array([]),
    })
}

  get phoneArray() : FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  get emailArray() : FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  get addressArray() : FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addPhoneNumber() {
    this.phoneArray.push(this.formBuilder.group({
      phone_number: ['', Validators.required],
    }));
  }

  addEmail() {
    this.emailArray.push(this.formBuilder.group({
      email: [''],
    }));
  }

  addAddress() {
    this.addressArray.push(this.formBuilder.group({
      address: ['', Validators.required],
    }));
  }

  removePhoneNumber(index: number) {
    this.phoneArray.removeAt(index);
  }

  removeEmail(index: number) {
    this.emailArray.removeAt(index);
  }

  removeAddress(index: number) {
    this.addressArray.removeAt(index);
  }

  onSubmitContactForm() {
    if (this.contactForm.valid) {
      this.contactForm.patchValue({
        birthday: new Date(this.contactForm.value['birthday']).toISOString().split('T')[0]
      })

      const contact = this.contactForm.value as Contact;

      if (this.activatedRoute.snapshot.paramMap.get('id')) {
        this.contactService.editContact(this.activatedRoute.snapshot.paramMap.get('id')!, contact).subscribe({
          next: (response) => {
            this.router.navigate(['/'])
            alert("Contacto actualizado exitosamente")
          },
          error: (error) => {
            alert(`Error al actualizar el contacto ${error}`)
          }
        })
      } else {
        this.contactService.addContact(contact).subscribe({
          next: (response) => {
            console.log(response);
            alert("Contacto guardado correctamente")
            this.router.navigate(['/'])
          },
          error: (error) => {
            alert(`Error al momento de guardar el contacto ${error}`)
          }
        })
      }
    }
  }
}
