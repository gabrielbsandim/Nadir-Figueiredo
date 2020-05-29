import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { BugModel } from '../model/BugModel';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BugsService extends BaseService<BugModel> {

  constructor(public http: HttpService) {
    super('bug', http);
  }

}