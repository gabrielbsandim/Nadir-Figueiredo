import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { BaseService } from '../base/base-service';
import { BugModel } from '../model/BugModel';

@Injectable({
  providedIn: 'root'
})
export class BugsService extends BaseService<BugModel> {

  constructor(public http: HttpService) {
    super('bug', http);
  }

}