import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year = 1970; // epoch time
  constructor() {
    // set the year to the current year on load
    this.year = new Date().getFullYear();
  }
}
