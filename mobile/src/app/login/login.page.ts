import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: any = {};

  constructor(
    private usersService: UsersService,
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
      // this.matSnack.open('Usuário ou senha inválidos', undefined, { duration: 2000 })
    }
  }

}
