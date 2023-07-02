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

  public addContact(contact: Contact): void {
    this.contactList.push(contact);
    this.contactListBehaviorSubject.next(this.contactList);
    try {
      localStorage.setItem("ContactList", JSON.stringify(this.contactList));
    }
    catch (error) {
      console.error(error);
    }
  }

  public getSpecificContact(id: number): Contact | null {
    const foundContactList = this.contactList[id];
    if (foundContactList) {
      return foundContactList;
    }
    return null;
  }

  public modifyContact(modifiedContact: Contact, index: number): void {
    this.contactList[index] = modifiedContact;
    this.syncContactList();
  }

  public getListFromLocalStorage(): void {

    const stringFromLocalStorage = localStorage.getItem("ContactList");
    if (stringFromLocalStorage) {
      const arrayFromLocalStorage = JSON.parse(stringFromLocalStorage);
      if (Array.isArray(arrayFromLocalStorage)) {
        this.contactList = arrayFromLocalStorage;
        this.syncContactList();
      }
    }
  }

  private syncContactList(): void {
    this.contactListBehaviorSubject.next(this.contactList);
    try {
      localStorage.setItem("ContactList", JSON.stringify(this.contactList));
    }
    catch (error) {
      console.error(error);
    }
  }


}
