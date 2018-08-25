import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule, MatListModule, MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RegisterComponent } from './register/register.component';
import {AppConfirmDialogComponent, MyService} from "./services/my-service";
import {HttpClientModule} from "@angular/common/http";
import {LoginCheck} from "./services/login-check";
import { HomeComponent } from './home/home.component';

const ROUTES = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent,
  canActivate: [LoginCheck]
}, {
  path: 'home',
  component: HomeComponent,
  canActivate: [LoginCheck]
}];

const MAT_MODULES = [
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatListModule,
  MatPaginatorModule,
  MatCardModule,
  MatDialogModule
];

const DEFAULT_ANGULAR_MODULES = [
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  BrowserModule,
  RouterModule.forRoot(ROUTES),
  HttpClientModule
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AppConfirmDialogComponent
  ],
  imports: [
    ...DEFAULT_ANGULAR_MODULES,
    ...MAT_MODULES
  ],
  providers: [
    MyService,
    LoginCheck
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppConfirmDialogComponent]
})
export class AppModule { }
