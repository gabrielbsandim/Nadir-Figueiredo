import { Component, OnInit } from '@angular/core';
import { InspectionModel } from 'src/model/InspectionModel';
import { UsersModel } from 'src/model/UsersModel';
import { MachinesModel } from 'src/model/MachinesModel';
import { BugModel } from 'src/model/BugModel';
import { InspectionsService } from 'src/service/inspections.service';
import { UsersService } from 'src/service/users.service';
import { MachinesService } from 'src/service/machines.service';
import { BugsService } from 'src/service/bugs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-inspection',
  templateUrl: './new-inspection.page.html',
  styleUrls: ['./new-inspection.page.scss'],
})
export class NewInspectionPage implements OnInit {
  inspection: InspectionModel = new InspectionModel;
  users: Array<UsersModel>;
  machines: Array<MachinesModel>;
  bugs: Array<BugModel>;

  
  constructor(
    private InspectionsSrv: InspectionsService,
    private UsersSrv: UsersService,
    private MachinesSrv: MachinesService,
    private BugsSrv: BugsService,
    private router: Router,
    private active: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.bindFKs();
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

  async save(): Promise<void> {
    
    const result = await this.InspectionsSrv.post(this.inspection);
    if (result.success) {
      // this.matSnack.open("Inspeção salva com sucesso!", undefined, { duration: 3000 });
      this.router.navigateByUrl("/home");
    }
  }

}
