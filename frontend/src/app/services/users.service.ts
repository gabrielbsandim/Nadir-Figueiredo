import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { UsersModel } from '../model/UsersModel';
import { HttpService } from './http.service';
import { BaseService } from '../base/base-service';
import { IResultHttp } from '../Interfaces/IResultHttp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UsersModel> {

  private loginSubject = new Subject<boolean>();

  constructor(public http: HttpService) {
    super('users', http);
  }

  login(identity: string, password: string): Promise<IResultHttp> {
    console.log(identity, ' ', password);

    return this.http.post(`${environment.url_api}/login`, { identity, password });
  }

  configureLogin(o: any): void {
    const { token, user } = o.data;
    localStorage.setItem('AppNadir:token', token);
    localStorage.setItem('AppNadir:user', JSON.stringify(user));
    this.loginSubject.next(this.isStaticLogged);
  }

  get isLogged(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  get isStaticLogged(): boolean {
    return !!localStorage.getItem('AppNadir:token');
  }
}
