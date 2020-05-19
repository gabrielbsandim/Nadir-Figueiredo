import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};

  constructor(
    private usersService: UsersService,
    private matSanck: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.usersService.isStaticLogged) {
      return this.router.navigateByUrl('/home');
    }
  }

  async login(): Promise<void> {
    const result = await this.usersService.login(this.form.identity, this.form.password);

    if (result.success) {
      this.usersService.configureLogin(result);
      this.router.navigateByUrl('/home');
    } else {
      this.matSanck.open('Usuário ou senha inválidos', undefined, { duration: 2000 })
    }
  }

}
