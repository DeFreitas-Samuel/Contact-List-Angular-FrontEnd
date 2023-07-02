import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { CreateContactComponent } from './components/create-contact/create-contact.component';

const routes: Routes = [
  { path: 'list', component: ContactListComponent },
  { path: 'create-contact', component: CreateContactComponent },
  { path: "", redirectTo: "list", pathMatch: "full" },
  { path: "**", redirectTo: "not-found" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
