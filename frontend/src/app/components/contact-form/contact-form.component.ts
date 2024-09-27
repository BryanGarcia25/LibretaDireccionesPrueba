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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      notes: [''],
      birthday: ['', Validators.required],
      website: [''],
      company: ['', Validators.required],
      phones: this.formBuilder.array([
        this.formBuilder.group({
          phone_number: ['', Validators.required],
        })
      ]),
      emails: this.formBuilder.array([
        this.formBuilder.group({
          email: [''],
        })
      ]),
      addresses: this.formBuilder.array([
        this.formBuilder.group({
          address: [''],
        })
      ]),
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
    
  }
}
