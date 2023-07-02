import { Component, OnInit } from '@angular/core';
import { ContactManagerService } from './services/contact-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private contactManagerService: ContactManagerService) { }
  ngOnInit(): void {
    this.bootstrap();
  }

  private bootstrap() {
    this.contactManagerService.getListFromLocalStorage();
  }

}
