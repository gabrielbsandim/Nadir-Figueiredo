import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { BaseService } from '../base/base-service';
import { MachinesModel } from '../model/MachinesModel';

@Injectable({
  providedIn: 'root'
})
export class MachinesService extends BaseService<MachinesModel> {

  constructor(public http: HttpService) {
    super('machines', http);
  }



}
