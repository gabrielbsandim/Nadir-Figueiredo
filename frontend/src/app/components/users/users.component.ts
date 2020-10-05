import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal from 'sweetalert2';

import { IUsers } from 'src/app/Interfaces/IUsers';
import { UsersService } from 'src/app/services/users.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  columns: string[] = ['name', 'username', 'role', 'isAdmin', 'id'];
  dataSource: MatTableDataSource<IUsers>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userSrv: UsersService) { }

  async ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const users = await this.userSrv.GetAll();
    this.dataSource = new MatTableDataSource(users.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(user: IUsers): Promise<void> {
    const options: any = {
      ...Constants.confirm_swal, text: `Deseja realmente excluir o usuário ${user.name}?`
    };
    const { value } = await Swal.fire(options);

    if (value) {
      const result = await this.userSrv.delete(user.id);
      if (result.success) {
        this.bind();
      }
    }
  }

}
