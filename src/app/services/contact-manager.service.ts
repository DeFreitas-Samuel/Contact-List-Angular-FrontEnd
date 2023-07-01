import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from 'src/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactManagerService {

  private contactList: Contact[] = [];
  private contactListBehaviorSubject: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(this.contactList);


  public get contactList$(): Observable<Contact[]> {
    return this.contactListBehaviorSubject.asObservable();
  }

  public addContact(contact: Contact) {
    this.contactList.push(contact);
    this.contactListBehaviorSubject.next(this.contactList);
  }


  constructor() { }
}