import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['../page/page.components.scss', './join.component.scss']
})
export class JoinComponent {
  @ViewChild('inputContainer') inputContainer;

  form = new FormGroup({
    id: new FormControl('')
  })

  get id() {
    return this.form.controls.id;
  }

  get gameLink() {
    return `/game/${this.id.value}`.toLowerCase();
  }
}