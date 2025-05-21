import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) {}

  public getUsers():Observable<any> {
    return this.http.get('http://localhost:8066/api/users/users');
  }
}
