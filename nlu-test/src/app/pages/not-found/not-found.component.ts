import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  currentPath = '';
  constructor(route: ActivatedRoute) {
    route.url.subscribe(v => {
      this.currentPath = v.map(v => v.path).join('/');
    })
  }
}
