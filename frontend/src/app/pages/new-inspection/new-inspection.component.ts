import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { InspectionModel } from 'src/app/model/InspectionModel';
import { InspectionsService } from 'src/app/services/inspections.service';
import { UsersService } from 'src/app/services/users.service';
import { MachinesService } from 'src/app/services/machines.service';
import { BugsService } from 'src/app/services/bugs.service';
import { UsersModel } from 'src/app/model/UsersModel';
import { MachinesModel } from 'src/app/model/MachinesModel';
import { BugModel } from 'src/app/model/BugModel';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-inspection',
  templateUrl: './new-inspection.component.html',
  styleUrls: ['./new-inspection.component.scss']
})

export class NewInspectionComponent implements OnInit {
  inspection: InspectionModel = new InspectionModel;
  users: Array<UsersModel>;
  machines: Array<MachinesModel>;
  bugs: Array<BugModel>;
  auxBugs = [];


  userValidation = new FormControl('', [Validators.required]);
  articleValidation = new FormControl('', [Validators.required]);
  tagValidation = new FormControl('', [Validators.required]);
  lengthValidation = new FormControl('', [Validators.required]);
  amountSamplesValidation = new FormControl('', [Validators.required]);
  amountOfPartsValidation = new FormControl('', [Validators.required]);
  statusValidation = new FormControl('', [Validators.required]);
  machineValidation = new FormControl('', [Validators.required]);
  bugValidation = new FormControl('', [Validators.required]);


  constructor(
    private InspectionsSrv: InspectionsService,
    private UsersSrv: UsersService,
    private MachinesSrv: MachinesService,
    private BugsSrv: BugsService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }


  ngOnInit() {
    this.bindFKs();
    this.active.params.subscribe(p => this.getId(p.id));
  }

  getErrorMessage() {
    if (this.userValidation.hasError('required')) {
      return 'O campo acima é obrigatório.';
    }
  }

  async bindFKs(): Promise<void> {
    const resultUsers = await this.UsersSrv.GetAll();
    const resultMachines = await this.MachinesSrv.GetAll();
    const resultBugs = await this.BugsSrv.GetAll();

    if (resultUsers.success && resultMachines.success && resultBugs.success) {
      this.users = resultUsers.data as Array<UsersModel>;
      this.machines = resultMachines.data as Array<MachinesModel>;
      this.bugs = resultBugs.data as Array<BugModel>;
    }
  }

  async getId(id: string): Promise<void> {
    if (id === 'new') { return; }
    const result = await this.InspectionsSrv.GetById(id);
    this.inspection = result.data as InspectionModel;

    if (this.inspection.bugs)
      this.auxBugs = this.inspection.bugs.map(bug => {
        return bug.id
      });
  }

  async save(): Promise<void> {
    this.inspection.bugs = [{ id: '1' }];
    this.auxBugs.forEach(e => {
      this.inspection['bugs'].push({
        id: e
      });
    });
    this.inspection.bugs.splice(0, 1);

    let result: any;

    if (this.inspection.id) {
      result = await this.InspectionsSrv.put(this.inspection.id, this.inspection);
    } else {
      result = await this.InspectionsSrv.post(this.inspection);
    }

    if (result.success) {
      this.matSnack.open("Inspeção salva com sucesso!", undefined, { duration: 3000 });
      this.router.navigateByUrl("/inspection");
    }
  }

}
