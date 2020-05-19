import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { UsersModel } from 'src/app/model/UsersModel';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  user: UsersModel = new UsersModel();

  constructor(
    private UsersService: UsersService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return; }
    const result = await this.UsersService.GetById(uid);
    this.user = result.data;
  }

  async save(): Promise<void> {
    const result = await this.UsersService.post(this.user);
    if (result.success) {
      this.matSnack.open("Usuário salvo com sucesso!", undefined, { duration: 3000 });
      this.router.navigateByUrl("/users");
    }
  }

}
