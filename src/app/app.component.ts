import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {MyService} from "./services/my-service";
import {LoginCheck} from "./services/login-check";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, private loginCheck: LoginCheck) {
  }
}
