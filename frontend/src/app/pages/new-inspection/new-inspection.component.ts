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

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return; }
    const result = await this.InspectionsSrv.GetById(uid);
    this.inspection = result.data as InspectionModel;
  }

  async save(): Promise<void> {
    const result = await this.InspectionsSrv.post(this.inspection);
    if (result.success) {
      this.matSnack.open("Inspeção salva com sucesso!", undefined, { duration: 3000 });
      this.router.navigateByUrl("/inspection");
    }
  }

}
