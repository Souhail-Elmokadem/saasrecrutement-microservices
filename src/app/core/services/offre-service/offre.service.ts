import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../../../models/Offre';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiUrl = 'http://localhost:9090';

  private serviceUrl = '/offre-service';

  constructor(private http: HttpClient) {}

  getAllOffers(kw:string,size:number,page:number): Observable<Offer[]> {
    return this.http.get<any>(this.apiUrl+this.serviceUrl+'/api/jobs?kw=' + kw+ '&page='+page+'&size=' + size);
  }
}
