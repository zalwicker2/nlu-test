import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-btn',
  templateUrl: './dropdown-btn.component.html',
  styleUrls: ['../navbar.component.css', './dropdown-btn.component.css']
})
export class DropdownBtnComponent {
  @Input() title = '';
  @Input() rootLink = ''
  @Input() options = [];

  @Output() hideNav = new EventEmitter();

  showing = false;

  constructor(private router: Router) { }

  navigate() {
    this.router.navigateByUrl(this.rootLink);
  }
}
