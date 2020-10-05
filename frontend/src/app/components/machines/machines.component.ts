import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import Swal from 'sweetalert2';

import { IMachines } from '../../Interfaces/IMachines';
import { MachinesService } from 'src/app/services/machines.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})

export class MachinesComponent implements OnInit {
  columns: string[] = ['name', 'velocity', 'id'];
  dataSource: MatTableDataSource<IMachines>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private machineSrv: MachinesService) { }

  async ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const machines = await this.machineSrv.GetAll();
    this.dataSource = new MatTableDataSource(machines.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(machine: IMachines): Promise<void> {
    const options: any = {
      ...Constants.confirm_swal, text: `Deseja realmente excluir a máquina ${machine.name}?`
    };
    const { value } = await Swal.fire(options);

    if (value) {
      const result = await this.machineSrv.delete(machine.id);
      if (result.success) {
        this.bind();
      }
    }
  }

}
