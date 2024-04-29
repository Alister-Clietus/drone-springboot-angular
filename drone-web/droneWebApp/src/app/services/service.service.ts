import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  public postdata<T>(url: string, data: any): Observable<T> 
  {
    return this.http.post<T>(url,data);
  }
  public updatedata<T>(url: string, data: any): Observable<T> 
  {
    return this.http.put<T>(url,data);
  }
  public getprofile<T>(url: string,id: any): Observable<T> 
  {
    return this.http.get<T>(url+id);
  }
  public deleteprofile<T>(url: string,id: any): Observable<T> 
  {
    return this.http.delete<T>(url+id);
  }
}
