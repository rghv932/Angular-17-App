import { Component, inject, OnInit } from '@angular/core';

import { NgxSpinnerComponent } from 'ngx-spinner';

import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, HomeComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  accountService = inject(AccountService);
  users: any;

  // ngOnInit(): void {
  //   this.http.get('https://localhost:7190/api/users').subscribe({
  //     next: response => this.users = response,
  //     error: err => console.log('error occurred:', err),
  //     complete: () => console.log('Request has completed')
  //   })
  // }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

}
