import { HttpService } from '../services/http.service';
import { IResultHttp } from '../interfaces/IResultHttp';
import { environment } from './../../environments/environment';

export abstract class BaseService<T> {
  urlBase: string = '';

  constructor(public url: string, public http: HttpService) {
    this.urlBase = `${environment.url_api}/${this.url}`;
  }

  public GetAll(): Promise<IResultHttp> {
    return this.http.get(this.urlBase);
  }

  public GetById(id: string): Promise<IResultHttp> {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  public post(model: T): Promise<IResultHttp> {
    return this.http.post(this.urlBase, model);
  }

  public put(id: string, model: T): Promise<IResultHttp> {
    return this.http.put(`${this.urlBase}/${id}`, model);
  }

  public delete(id: string): Promise<IResultHttp> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }

}
