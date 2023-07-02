import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from 'src/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactManagerService {

  private contactList: Contact[] = [];
  private contactListBehaviorSubject: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(this.contactList);

  constructor(private http: HttpClient) { }

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

  public getListFromStorage(): void {

    const stringFromLocalStorage = localStorage.getItem("ContactList");
    if (stringFromLocalStorage) {
      const arrayFromLocalStorage = JSON.parse(stringFromLocalStorage);
      if (Array.isArray(arrayFromLocalStorage)) {
        this.contactList = arrayFromLocalStorage;
        this.syncContactList();
      }
    }
    else {
      this.getListFromJSON();
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

  public getListFromJSON() {
    this.http.get('http://localhost:4200/assets/contacts.json').subscribe({
      next: (contactListStored) => {
        this.contactList = contactListStored as Contact[];
        this.syncContactList();
      }, error: (error) => {
        console.error('There was an error fetching the JSON', error);
      }
    })
  }


}
