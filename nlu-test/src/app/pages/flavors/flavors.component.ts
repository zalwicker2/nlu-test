import { Component } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-flavors',
  templateUrl: './flavors.component.html',
  styleUrls: ['./flavors.component.css']
})
export class FlavorsComponent {
  flavorsList = [];

  constructor(private flavors: ServerService) { }
  ngOnInit() {
    this.flavors.GetCategories() // get the categories from server
      .then((results: { Category: String, CategoryId: String }[]) => {
        if (results == null) {
          console.error('Failed to fetch! Is the server running?')
        } else {
          for (let result of results) {
            this.flavorsList.push(result) // add categories to list
          }
        }
      })
  }
}
