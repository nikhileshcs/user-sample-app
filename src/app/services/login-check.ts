import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class LoginCheck implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (window.sessionStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
