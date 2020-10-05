import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { MachinesModel } from 'src/app/model/MachinesModel';
import { MachinesService } from 'src/app/services/machines.service';

@Component({
  selector: 'app-new-machine',
  templateUrl: './new-machine.component.html',
  styleUrls: ['./new-machine.component.scss']
})
export class NewMachineComponent implements OnInit {
  machine: MachinesModel = new MachinesModel();

  constructor(
    private MachinesService: MachinesService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }

  async getId(id: string): Promise<void> {
    if (id === 'new') { return; }
    const result = await this.MachinesService.GetById(id);
    this.machine = result.data;
  }

  async save(): Promise<void> {
    let result: any;
    if (this.machine.id) {
      result = await this.MachinesService.put(this.machine.id, this.machine);
    } else {
      result = await this.MachinesService.post(this.machine);
    }
    if (result.success) {
      this.matSnack.open("Máquina salva com sucesso!", undefined, { duration: 4000 });
      this.router.navigateByUrl("/machine");
    }
  }

}
