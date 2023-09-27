import { Component } from '@angular/core';
import { FlavorsService } from 'src/app/services/flavors.service';

@Component({
  selector: 'app-flavors',
  templateUrl: './flavors.component.html',
  styleUrls: ['./flavors.component.css']
})
export class FlavorsComponent {
  flavorsList = [];

  constructor(private flavors: FlavorsService) { }
  ngOnInit() {
    this.flavors.GetCategories().then((results: { Category: String, CategoryId: String }[]) => {
      if (results == null) {
        console.log('uh oh');
      } else {
        for (let result of results) {
          console.log(result);
          this.flavorsList.push(result)
        }
      }
    })
  }
}
