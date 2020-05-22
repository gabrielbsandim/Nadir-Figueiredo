import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import Swal from 'sweetalert2';

import { IInspections } from '../../Interfaces/IInspections';
import { InspectionsService } from '../../services/inspections.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.scss']
})

export class InspectionsComponent implements OnInit {
  columns: string[] = ['id', 'userName', 'machineName', 'date', 'statusPalconst', 'id'];
  dataSource: MatTableDataSource<IInspections>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private inspectionsSrv: InspectionsService) { }

  async ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const inspection = await this.inspectionsSrv.GetAll();
    this.dataSource = new MatTableDataSource(inspection.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(inspection: IInspections): Promise<void> {
    const options: any = {
      ...Constants.confirm_swal, text: `Deseja realmente excluir a inspeção ${inspection.id}?`
    };
    const { value } = await Swal.fire(options);

    if (value) {
      const result = await this.inspectionsSrv.delete(inspection.id);
      if (result.success) {
        this.bind();
      }
    }
  }

}
