import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {MyService} from "../services/my-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  pwdFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private snackbar: MatSnackBar, private myservice: MyService, private router: Router) { }

  ngOnInit() {
  }


  onFormSubmit($event) {
    if (this.emailFormControl.invalid || this.pwdFormControl.invalid) {
      this.snackbar.open('Check the form fields', 'Okay', {
        duration: 3000
      });
      return;
    }
    this.myservice.registerUser({
      "email": this.emailFormControl.value,
      "password": this.pwdFormControl.value
    }).then((res) => {
      this.snackbar.open('User registration successful!', undefined, {
        duration: 2000
      });
      this.router.navigate(['']);
    }, () => {

    })
  }

}
