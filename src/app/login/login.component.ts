import {Component} from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {MyService} from "../services/my-service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    showSpinner = false;

    emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    pwdFormControl = new FormControl('', [
      Validators.required
    ]);

    constructor(private snackbar: MatSnackBar, private myService: MyService, private router: Router) {

    }

    onFormSubmit($event) {
      if (this.emailFormControl.invalid || this.pwdFormControl.invalid) {
        this.snackbar.open('Check the form fields', 'Okay', {
          duration: 3000
        });
        return;
      }
      this.showSpinner = true;
      const email = this.emailFormControl.value,
        password = this.pwdFormControl.value;
      this.myService.loginUser({
        email,
        password
      }).then(() => {
        this.showSpinner = false;
        this.snackbar.open('Login Successful');
        this.router.navigate(['home']);
      }, () => {
        this.showSpinner = false;
        this.snackbar.open('Login UnSuccessful');
      });
    }
}
