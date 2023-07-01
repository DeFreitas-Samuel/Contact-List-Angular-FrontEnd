import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent {
  public contactForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    contactNumber: [''],
  });



  public constructor(private fb: FormBuilder) {

  }

  public onCreateContact() {
    console.log(this.contactForm.value);
  }
}
