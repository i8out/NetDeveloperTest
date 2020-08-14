import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Expires': '0',
      'Pragma': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {

  }
  public Get(url: string) {
    return this.http.get<any>(url, this.httpOptions).pipe();
  }

  public Post(url: string, input_data: any) {
    return this.http.post<any>(url, input_data, this.httpOptions)
      .pipe();
  }

  public Put(url: string, input_data: any) {
    return this.http.put<any>(url, input_data, this.httpOptions)
      .pipe();
  }

  public Delete(url: string) {
    return this.http.delete<any>(url, this.httpOptions)
      .pipe();
  }
}
