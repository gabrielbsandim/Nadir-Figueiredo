import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResultHttp } from 'src/interfaces/IResultHttp';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(
    private http: HttpClient,
    private alertSrv: AlertService,
    private spinnerSrv: SpinnerService
  ) {

  }

  private createHeader(header?: HttpHeaders): HttpHeaders {
    if (!header) {
      header = new HttpHeaders();
    }

    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');

    const token = localStorage.getItem('AppNadir:token');
    if (token) { 
      header = header.append('Authorization', 'Bearer ' + token);
    }
    return header;
  }

  public get(url: string): Promise<IResultHttp> {
    const header = this.createHeader();

    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.Show();
        const res = await this.http.get(url, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        await this.spinnerSrv.Hide();
      } catch (error) {
        await this.spinnerSrv.Hide();
        resolve({ success: false, data: undefined, error });
      }
    })
  }

  public post(url: string, model: any): Promise<IResultHttp> {
    const header = this.createHeader();
    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.Show();
        const res = await this.http.post(url, model, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        await this.spinnerSrv.Hide();
      } catch (error) {
        await this.spinnerSrv.Hide();
        resolve({ success: false, data: {}, error });
      }
    });
  }

  // public delete(url: string): Promise<IResultHttp> {
  //   const header = this.createHeader();
  //   return new Promise(async (resolve) => {
  //     try {
  //       await this.spinnerSrv.Show();
  //       const res = await this.http.delete(url, { headers: header }).toPromise();
  //       resolve({ success: true, data: res, error: undefined });
  //       await this.spinnerSrv.Hide();
  //     } catch (error) {
  //       await this.spinnerSrv.Hide();
  //       if (error.status == 400) {
  //         let errorText = '<ul>';
  //         if (Array.isArray(error.error)) {
  //           error.error.array.forEach(element => {
  //             errorText += '<li style="text-align: left">${element.message || element}</li>';
  //           });
  //           errorText += '</ul>';
  //           this.alertSrv.alert('Atenção', errorsText);
  //         }
  //       }
  //       resolve({ success: false, data: {}, error });
  //     }
  //   });
  // }
}