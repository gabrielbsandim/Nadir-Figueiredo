import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { UsersModel } from '../model/UsersModel';
import { HttpService } from './http.service';
import { IResultHttp } from '../Interfaces/IResultHttp';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UsersModel> {

  private loginSubject = new Subject<boolean>();

  constructor(public http: HttpService, private router: Router) {
    super('users', http);
  }

  login(identity: string, password: string): Promise<IResultHttp> {
    return this.http.post(`${environment.url_api}/login`, { identity, password });
  }

  configureLogin(o: any): void {
    const { token, user } = o.data;
    localStorage.setItem('AppNadir:token', token);
    localStorage.setItem('AppNadir:user', JSON.stringify(user));
    this.loginSubject.next(this.isStaticLogged);
  }

  // logout() {
  //   console.log('passei');
    
  //   localStorage.removeItem('AppNadir:token');
  //   localStorage.removeItem('AppNadir:user');
  //   this.router.navigateByUrl('/login');
  // }

  get isLogged(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  get isStaticLogged(): boolean {
    return !!localStorage.getItem('AppNadir:token');
  }
}
