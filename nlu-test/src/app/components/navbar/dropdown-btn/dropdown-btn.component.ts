import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-btn',
  templateUrl: './dropdown-btn.component.html',
  styleUrls: ['../navbar.component.css', './dropdown-btn.component.css']
})
export class DropdownBtnComponent {
  @Input() title = ''; // the text for the button
  @Input() rootLink = '' // the link for clicking on the dropdown button
  @Input() options = []; // the dropdown options

  @Output() hideNav = new EventEmitter(); // event to emit to hide the nav on mobile if a button is clicked

  showing = false; // whether the nav is showing

  constructor(private router: Router) { }

  /**
   * @function navigate
   * @description Navigates to the rootlink
   */
  navigate() {
    this.router.navigateByUrl(this.rootLink);
  }
}
