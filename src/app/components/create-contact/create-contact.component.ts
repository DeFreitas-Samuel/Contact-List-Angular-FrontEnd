import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';


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
      this.fb.control('', Validators.required)
    ]),
  });



  public constructor(private fb: FormBuilder) {

  }

  public onCreateContact() {
    console.log(this.contactForm.value);
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
}
