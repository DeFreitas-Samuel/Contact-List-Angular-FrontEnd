import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactManagerService } from 'src/app/services/contact-manager.service';
import { Contact } from 'src/models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  public contactList$!: Observable<Contact[]>;

  constructor(private contactManagerService: ContactManagerService, private router: Router) { }

  ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap() {
    this.contactManagerService.getListFromLocalStorage();
    this.contactList$ = this.contactManagerService.contactList$;
  }

  public onCreateNewContact() {
    this.router.navigate(['./create-contact']);
  }
}
