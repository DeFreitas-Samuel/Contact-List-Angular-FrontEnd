import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactManagerService } from 'src/app/services/contact-manager.service';
import { Contact } from 'src/models/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent {
  public contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    contactNumbers: this.fb.array([
      this.fb.control('', [Validators.required, Validators.pattern(/[0-9]{10}/)])
    ]),
  });

  public validUser: Boolean = false;
  private contactId: number = Number(this.activatedRoute.snapshot.params['id']) - 1;

  public constructor(private fb: FormBuilder,
    private contactManagerService: ContactManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap() {

    const contactToModify = this.contactManagerService.getSpecificContact(this.contactId);
    if (contactToModify) {
      this.validUser = true;
      const amountOfContactNumbers = contactToModify.contactNumbers.length;

      for (let i = this.contactNumbers.length; i < amountOfContactNumbers; i++) {
        this.onAddNewContactNumber();
      }

      this.contactForm.reset(contactToModify);
    }
  }

  public onSaveModification() {
    const contactToCreate = this.convertFormToContactObject(this.contactForm);
    this.contactManagerService.modifyContact(contactToCreate, this.contactId);
    this.onGoToList();
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
