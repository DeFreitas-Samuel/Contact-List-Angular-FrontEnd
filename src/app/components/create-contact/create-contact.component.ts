import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactManagerService } from 'src/app/services/contact-manager.service';
import { Contact } from 'src/models/contact';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent {
  public contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    contactNumbers: this.fb.array([
      this.fb.control('', [Validators.required, Validators.pattern(/[0-9]{10}/)])
    ]),
  });



  public constructor(private fb: FormBuilder, private contactManagerService: ContactManagerService, private router: Router) { }


  public onCreateContact() {
    const contactToCreate = this.convertFormToContactObject(this.contactForm);
    this.contactManagerService.addContact(contactToCreate);
    this.contactForm.reset();

  }

  public get contactNumbers() {
    return this.contactForm.get('contactNumbers') as FormArray;
  }

  public onAddNewContactNumber() {
    this.contactNumbers.push(this.fb.control('', Validators.required))
  }

  public onRemoveLastContactNumber() {
    const lastIndexOfContactNumbers = this.contactNumbers.length - 1;
    if (lastIndexOfContactNumbers > 0) {

      this.contactNumbers.removeAt(lastIndexOfContactNumbers);
    }
  }

  private convertFormToContactObject(contactForm: FormGroup): Contact {
    return contactForm.value as Contact;
  }

  public onGoToList() {
    this.router.navigate(['./list'])
  }

}
