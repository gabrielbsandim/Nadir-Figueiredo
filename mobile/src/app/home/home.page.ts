import { Component } from '@angular/core';
import { UsersService } from 'src/service/users.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private usersService: UsersService 
  ) {}


  async logout() {
    console.log('passei3');
    
    await this.usersService.logout();

  }
}