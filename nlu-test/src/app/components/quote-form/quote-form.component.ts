import { Component, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent {
  constructor(private server: ServerService) { }

  @ViewChild('form') form;
  status = { success: true, msg: '' }; // status from server
  canSubmit = true;
  /**
   * @function Submit
   * @description Submits the form to the server and 
   */

  async Submit() {
    const form = <HTMLFormElement>this.form.nativeElement; // convert form to HTMLFormElement
    if (this.canSubmit) { // if the form can be submitted
      if (form.checkValidity()) { // check if all fields are ready to be sent
        this.status.success = true; // set success to true temporarily since fields are correct
        this.status.msg = 'Submitting form...'; // update message to show submitting form

        const data = new FormData(this.form.nativeElement); // convert form to formdata
        const result = await this.server.SubmitForm(data); // submit the form to server

        if (result.status == 200) { // if successful request
          this.status.success = true
          this.status.msg = 'Form successfully submitted!';
          this.canSubmit = false; // disallow further requests to kinda prevent spamming
        } else { // if request unsuccessful
          this.status.success = false;
          this.status.msg = result.msg; // show user the error message from server
        }
      } else {
        this.status.success = false
        this.status.msg = 'Please fix all errors in the form!';
      }
    }
  }

  @ViewChild('comments') comments;
  /**
   * @function validateComments
   * Validates the comments textarea since textarea does not have pattern matching built-in
   * @returns boolean Whether comments are valid
   */
  validateComments() {
    const value = this.comments.nativeElement.value;
    const match = value.match(/[\w\s\d\!\.\?]+/) // allow letters, spaces, numbers, and punctuation.
    if (match) { // if the pattern is found
      if (match[0] == value) { // if the whole string matches the pattern
        return true;
      }
    }
    return false;
  }

  dummy() {
    // needed for state changes
  }
}
