import { Component, OnInit } from '@angular/core';
import {MyService} from '../services/my-service';
import {find} from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showProgressBar = true;

  recordsLength;

  pageSize;

  users;

  selectedUser;

  constructor(private myService: MyService) { }

  loadUsers(pageNumber?) {
    this.showProgressBar = true;
    this.myService.getUsers(pageNumber).then((response: any) => {
      this.showProgressBar = false;
      this.recordsLength = response.total;
      this.pageSize = response.per_page;
      this.users = response.data;
    }, () => {
      this.showProgressBar = false;
    });
  }

  onUserEditSubmit(event) {
    this.myService.updateUser(this.selectedUser.id, this.selectedUser).then((response) => {
      const originalUser = find(this.users, user => user.id === this.selectedUser.id);
      if (originalUser) {
        Object.assign(originalUser, response);
      }
      this.selectedUser = undefined;
    });
  }

  editUser(user) {
    this.selectedUser = {...user};
  }

  deleteUser(user) {
    this.myService.openConfirmDialog({
      message: 'Do you want to delete the user ' + user.first_name + '?'
    }).beforeClose().subscribe((res) => {
      debugger;
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  onPageChange(event) {
    this.loadUsers(event.pageIndex + 1);
  }

}
