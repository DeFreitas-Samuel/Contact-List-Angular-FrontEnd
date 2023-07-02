import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/models/contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  @Input() contact: Contact | undefined;
  @Input() index: number | undefined;

  constructor(private router: Router) { }


  public onEditContact() {
    console.log('noche');
    this.router.navigate(['./modify-contact', this.index]);
  }
}
