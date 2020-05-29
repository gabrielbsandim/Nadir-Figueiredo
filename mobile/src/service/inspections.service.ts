import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { InspectionModel } from '../model/InspectionModel';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class InspectionsService extends BaseService<InspectionModel> {

  constructor(public http: HttpService) {
    super('inspection', http);
  }

}