import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlavorsService } from 'src/app/services/flavors.service';

@Component({
  selector: 'app-flavor-detail',
  templateUrl: './flavor-detail.component.html',
  styleUrls: ['./flavor-detail.component.css']
})
export class FlavorDetailComponent implements OnInit {
  flavorsList = [];

  title = '';

  constructor(private flavors: FlavorsService, private route: ActivatedRoute, private router: Router) { }

  returnToFlavorsList() {
    this.router.navigate(['flavors']);
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.flavorsList.splice(0, this.flavorsList.length)
      const category = params['flavor'];
      console.log(category);
      if (category == null) {
        this.returnToFlavorsList();
        return;
      }
      const items = await this.flavors.GetFlavorsInCategory(category);
      console.log(items);
      if (items.length == 0) {
        this.returnToFlavorsList();
        return;
      } else {
        this.title = items[0].Category;
        for (let flavor of items) {
          this.flavorsList.push(flavor.Name)
        }
      }
    })
  }
}
