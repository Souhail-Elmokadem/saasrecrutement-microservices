import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrlCv= "http://localhost:9090"
  
  private serviceUrlCv = '/cv-service';

  private serviceUrlOffer = '/offre-service';

  constructor(private http: HttpClient) { }

  
  
  public getStats():Observable<any> {
    return this.http.get<any>(`${this.apiUrlCv+this.serviceUrlCv}/api/cv/stats`);
  
  }

  public getStatsOffer(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlCv+this.serviceUrlOffer}/api/jobs/stats`);
  }

}
