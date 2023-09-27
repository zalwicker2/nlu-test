import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // the built-in capability menu
  capabilityMenu = [
    { name: 'Design', link: 'design' },
    { name: 'Production', link: 'production' },
    { name: 'Certification', link: 'certification' },
  ];

  flavorsMenu = []; // the menu for flavors, to be autopopulated from srv

  showingNav = false; // whether the nav is showing

  constructor(private flavors: ServerService) { }

  ngOnInit() {
    this.flavors.GetCategories().then((results: { Category: String, CategoryId: String }[]) => {
      if (results == null) { // this shouldn't fire but just in case something went wrong on the server
        console.error('No results received! Is the server running?');
      } else {
        // iterate through the results and add them to the flavors menu. the menu will be populated from this aray.
        for (let result of results) {
          this.flavorsMenu.push({ name: result.Category, link: result.CategoryId })
        }
      }
    }).catch(console.error)
  }

  /**
   * @function toggle
   * @description Toggles visibility of nav. For use for calling from outside component. 
   */
  toggle() {
    this.showingNav = !this.showingNav
  }
}
