import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import Swal from 'sweetalert2';

import { IBugs } from '../../Interfaces/IBugs';
import { BugsService } from 'src/app/services/bugs.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})

export class BugsComponent implements OnInit {
  columns: string[] = ['description', 'id'];
  dataSource: MatTableDataSource<IBugs>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bugsSrv: BugsService) { }

  async ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const bug = await this.bugsSrv.GetAll();
    this.dataSource = new MatTableDataSource(bug.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(bug: IBugs): Promise<void> {
    const options: any = {
      ...Constants.confirm_swal, text: `Deseja realmente excluir o defeito ${bug.description}?`
    };
    const { value } = await Swal.fire(options);

    if (value) {
      const result = await this.bugsSrv.delete(bug.id);
      if (result.success) {
        this.bind();
      }
    }
  }

}
