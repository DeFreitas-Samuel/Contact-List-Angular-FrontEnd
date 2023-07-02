import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

const routes: Routes = [
  { path: 'list', title: 'Contact List', component: ContactListComponent },
  { path: 'create-contact', title: 'Create a Contact', component: CreateContactComponent },
  { path: 'modify-contact/:id', title: 'Modify Contact', component: EditContactComponent },
  { path: 'not-found', title: 'Not Found', component: NotFoundComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
