import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-flavor-detail',
  templateUrl: './flavor-detail.component.html',
  styleUrls: ['./flavor-detail.component.css']
})
export class FlavorDetailComponent implements OnInit {
  constructor(private flavors: ServerService, private route: ActivatedRoute, private router: Router) { }

  returnToFlavorsList() {
    this.router.navigate(['flavors']);
  }

  flavorsList = [];
  title = '';
  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.flavorsList.splice(0, this.flavorsList.length) // clear flavorsList
      const category = params['flavor']; // get the current flavor from url

      if (category == null) { // if user manually entered an invalid category
        this.returnToFlavorsList(); // send em back to the main page
        return;
      }

      const items = await this.flavors.GetFlavorsInCategory(category); // get flavors we need to display
      if (items.length == 0) { // if there aren't any flavors
        this.returnToFlavorsList();
        return;
      } else {
        this.title = items[0].Category; // set the title of the page to the category of the items
        for (let flavor of items) {
          this.flavorsList.push(flavor.Name) // add the flavors to the page
        }
      }
    })
  }
}
