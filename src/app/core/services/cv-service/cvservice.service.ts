import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cv } from '../../../models/Cv';

@Injectable({
  providedIn: 'root'
})
export class CvserviceService {
 

  apiUrl= "http://localhost:8068/api/cv"

  constructor(private http:HttpClient) { }



  createCv(Cv: Cv): Observable<Cv> {
    return this.http.post<Cv>(`${this.apiUrl}/create`, Cv);
  }
}
