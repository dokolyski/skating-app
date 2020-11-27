import { Component } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.style.css']
})
export class RegisterPageComponent {
  pending = false

  constructor(public location: Location) { }

}
