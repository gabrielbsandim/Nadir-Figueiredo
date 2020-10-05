import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

import { BugModel } from '../../model/BugModel';
import { BugsService } from 'src/app/services/bugs.service';

@Component({
  selector: 'app-new-bug',
  templateUrl: './new-bug.component.html',
  styleUrls: ['./new-bug.component.scss']
})
export class NewBugComponent implements OnInit {
  bug: BugModel = new BugModel;

  constructor(
    private BugsService: BugsService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }

  async getId(id: string): Promise<void> {
    if (id === 'new') { return; }
    const result = await this.BugsService.GetById(id);
    this.bug = result.data;
  }

  async save(): Promise<void> {
    let result: any;

    if (this.bug.id) {
      result = await this.BugsService.put(this.bug.id, this.bug);
    } else {
      result = await this.BugsService.post(this.bug);
    }
    if (result.success) {
      this.matSnack.open("Defeito salvo com sucesso!", undefined, { duration: 4000 });
      this.router.navigateByUrl("/bug");
    }
  }

}
