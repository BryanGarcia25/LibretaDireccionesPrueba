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
    })
}

  get phoneArray() : FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  addPhoneNumber() {
    this.phoneArray.push(this.formBuilder.group({
      phone_number: ['', Validators.required],
    }));
  }

  removePhoneNumber(index: number) {
    this.phoneArray.removeAt(index);
  }

  onSubmitContactForm() {
    
  }
}
