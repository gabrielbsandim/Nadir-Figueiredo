import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { BaseService } from '../base/base-service';
import { InspectionModel } from '../model/InspectionModel';

@Injectable({
  providedIn: 'root'
})
export class InspectionsService extends BaseService<InspectionModel> {

  constructor(public http: HttpService) {
    super('inspections', http);
  }

}
