import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLogged = false;

  constructor(private userService: UsersService) {

  }
  ngOnInit(): void {
    this.isLogged = this.userService.isStaticLogged;
    this.userService.isLogged.subscribe(logged => {
      this.isLogged = logged;
    });
  }

}
