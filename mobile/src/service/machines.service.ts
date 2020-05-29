import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { MachinesModel } from '../model/MachinesModel';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MachinesService extends BaseService<MachinesModel> {

  constructor(public http: HttpService) {
    super('machine', http);
  }

}