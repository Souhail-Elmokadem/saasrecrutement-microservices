import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cv } from '../../../models/Cv';
import { Education } from '../../../models/Educations';
import { Experience } from '../../../models/Experience';

@Injectable({
  providedIn: 'root'
})
export class CvserviceService {

  
 
 

  apiUrl= "http://localhost:9090/cv-service/api/cv"

  constructor(private http:HttpClient) { }

    createcvfromlocal(formData: FormData):Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/uploadcvfile`, formData);
      }

  createCv(cv: Cv,photo:File):Observable<Cv> {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('cv', new Blob([JSON.stringify(cv)], {type: 'application/json'}));
    return this.http.post<Cv>(`${this.apiUrl}/create`, formData);
  }
  updateCv(Cv: Cv): Observable<Cv> {
    return this.http.post<Cv>(`${this.apiUrl}/update`, Cv);
  }

  getCvByUser():Observable<Array<Cv>> {
    return this.http.get<Array<Cv>>(`${this.apiUrl}/get`)
  }
  getCvById(cvid: string):Observable<Cv> {
    return this.http.get<Cv>(`${this.apiUrl}/getbyid/${cvid}`)
  }
}
