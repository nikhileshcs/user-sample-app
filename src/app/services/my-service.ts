import {Component, Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

const DEFAULT_END_POINT = 'https://reqres.in/';
@Injectable()
export class MyService {
  constructor(private http: HttpClient, private dialog: MatDialog) {

  }
  registerUser(data) {
    let reference;
    return new Promise((success, reject) => {
      reference = this.http.post(DEFAULT_END_POINT + 'api/register', data).subscribe((data) => {
        success();
        reference.unsubscribe();
      }, (err) =>  {
        reject();
      });
    });
  }

  getUsers(pageNumber?) {
    return new Promise((success, reject) => {
      this.http.get(DEFAULT_END_POINT + 'api/users' + (pageNumber ? '?page=' + pageNumber : '')).subscribe((response: any) => {
        success(response);
      }, () => {
        reject();
      });
    });
  }

  updateUser(userId, data) {
    return new Promise((success, reject) => {
      this.http.put(DEFAULT_END_POINT + 'api/users/' + userId, data).subscribe((response: any) => {
        success(response);
      });
    });
  }

  deleteUser() {

  }

  openConfirmDialog(data) {
    return this.dialog.open(AppConfirmDialogComponent, {
      width: '250px',
      data: data
    });
  }

  isUserLoggedIn() {
    if (sessionStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  loginUser(data) {
    return new Promise((success, reject) => {
      this.http.post(DEFAULT_END_POINT + 'api/login', data).subscribe((data: any) => {
        window.sessionStorage.setItem('token', data.token);
        success(true);
      }, (err) =>  {
        reject();
      })
    });
  }
}


@Component({
  selector: 'app-confirm-dialog',
  template: `<div>
    <div [innerHTML]="message"></div>
    <button mat-raised-button color="primary" (click)="onOk()">Okay</button>
    <button mat-raised-button (click)="onCancel()">Cancel</button>
  </div>`
})
export class AppConfirmDialogComponent {

  message;

  constructor(
    public dialogRef: MatDialogRef<AppConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.message = data.message;
  }

  onOk() {
    this.dialogRef.close('okay');
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }
}
