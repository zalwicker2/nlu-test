import { Component, OnInit, ViewChild } from '@angular/core';
import { FlavorsService } from 'src/app/services/flavors.service';
import { DropdownBtnComponent } from './dropdown-btn/dropdown-btn.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  capabilityMenu = [
    { name: 'Design', link: 'design' },
    { name: 'Production', link: 'production' },
    { name: 'Certification', link: 'certification' },
  ];

  flavorsMenu = [];

  showingNav = false;

  constructor(private flavors: FlavorsService) { }
  ngOnInit() {
    this.flavors.GetCategories().then((results: { Category: String, CategoryId: String }[]) => {
      if (results == null) {
        console.log('uh oh');
      } else {
        for (let result of results) {
          this.flavorsMenu.push({ name: result.Category, link: result.CategoryId })
        }
      }
    })
  }

  toggle() {
    this.showingNav = !this.showingNav
  }
}
