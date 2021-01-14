import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users:  User[];
  selecteduser: any = {};
  modalHeading = "Add New User";
  modalbtn = "Submit";
  newUser = true;
  isError = false;
  errorMessage = "";
  delId = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
   this.getAllUsers();
  }

  getAllUsers() {
    this.apiService.getUsers().subscribe((users: User[])=>{
      this.users = users['users'];
      console.log(this.users);
    });
  }

  addUser() {
    this.modalHeading = "Add New User";
    this.modalbtn = "Submit";
    this.newUser = true;
  }
  updateUser(user) {
    this.modalHeading = "Modify User";
    this.modalbtn = "Update";
    this.selecteduser = user;
    this.newUser = false;
  }

  resetForm() {
    this.selecteduser = {};
  }

  onSubmit() {
      if(this.newUser) {
        this.apiService.createUser(this.selecteduser).subscribe(
          res => {
            console.log(res);
            if(res['error']) {
              this.isError = true;
              this.errorMessage = "Error! Check Console for Message";
            } else {
              this.errorMessage = "Success!";
              this.getAllUsers();
              this.resetForm();
            }
          }
        )
      } else {
        this.apiService.updateUser(this.selecteduser, this.selecteduser.id).subscribe(
          res => {
            console.log(res);
            if(res['error']) {
              this.isError = true;
              this.errorMessage = "Error! Check Console for Message";
            } else {
              this.errorMessage = "Success!";
              this.getAllUsers();
              this.resetForm();
            }
          }
        )
      }
  }

  onDelete(id) {
    this.delId = id;
  }

  deleteUser() {
   this.apiService.deleteUser(this.delId).subscribe(
     res => {
      console.log(res);
      if(res['error']) {
        this.isError = true;
        this.errorMessage = "Error! Check Console for Message";
      } else {
        this.errorMessage = "Success!";
        this.getAllUsers();
        this.delId = null;
      }
     }
   )
  }


}
