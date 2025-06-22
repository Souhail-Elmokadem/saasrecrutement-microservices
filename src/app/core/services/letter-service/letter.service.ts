import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Letter } from '../../../models/Letter';

@Injectable({
  providedIn: 'root'
})
export class LetterService {
 
  

  constructor(private http:HttpClient) { }

  apiUrl= "http://localhost:9090/cv-service/api/letters"

  // add methode for get letter by cvid
  getLetterByCvId(cvid: string): Observable<any> {
    const formData = new FormData();
    formData.append('cvId', cvid);
    return this.http.post(`${this.apiUrl}/generate`,formData);
  }



  saveLetter(letter: Letter, cvId: string):Observable<any> {
    console.log("Saving letter with CV ID:", cvId);
    console.log("Letter content:", JSON.stringify(letter));
    const formData = new FormData();
    formData.append('letterDto', new Blob([JSON.stringify(letter)], { type: 'application/json' }));
    formData.append('cvId', cvId);
    return this.http.post(`${this.apiUrl}/create`, formData);
  }
  updateLetter(letter: Letter, cvId: string, letterId: string):Observable<any>{
    const formData = new FormData();
    formData.append('letterDto', new Blob([JSON.stringify(letter)], { type: 'application/json' }));
    return this.http.put(`${this.apiUrl}/update/${cvId}/${letterId}`, formData);
    
  }

  getLetterByUser(): Observable<Array<Letter>> {
    return this.http.get<Array<any>>(`${this.apiUrl}/byUser`);
    
  }

  getLetterById(letterId: string): Observable<Letter> {
    return this.http.get<Letter>(`${this.apiUrl}/letter/${letterId}`);
  }
  deleteLetter(letterid: string):Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${letterid}`); 
    
  }
  

}
