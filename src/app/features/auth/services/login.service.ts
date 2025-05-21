import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  public login(email: string, password: string):Observable<any> {
    return this.http.post<any>('http://localhost:9090/user-service/api/auth/login', {
      username: email,
      password: password
    });
  }

  getMe(): Observable<any> {
    return this.http.get('http://localhost:9090/user-service/api/users/me', {
    });
  }
  
}
