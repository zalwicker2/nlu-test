import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent {
  @ViewChild('form') form;
  async Submit() {
    const form = <HTMLFormElement>this.form.nativeElement;
    console.log(form.checkValidity())
    if (form.checkValidity()) {
      const data = new FormData(this.form.nativeElement);
      await fetch('http://localhost:80/quote', {
        method: 'POST',
        body: data
      })
    }
  }

  dummy() {
    // needed for state changes
  }
}
