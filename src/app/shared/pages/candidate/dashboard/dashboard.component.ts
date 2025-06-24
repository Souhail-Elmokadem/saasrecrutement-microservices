import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../core/services/dashboard-service/dashboard.service';
import { DashboardStats } from '../../../../models/DashboardStats';
import { Offer } from '../../../../models/Offre';
import { SavedJob } from '../../../../models/SavedJob';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashserv: DashboardService;
  listoffers: Offer[] = [];
  listoffersSaved: SavedJob[] = [];
  stats: DashboardStats={
    totalCvs: '',
    totalApplications: 0,
    savedJobs: 0,
    recommendedOffers: 0,
    profileCompletion: 0,
    totalLetters: ''
  };

  constructor(dashserv: DashboardService) {
    this.dashserv = dashserv;
  }

  ngOnInit(): void {
   
     this.getstats(); 
     this.getstatsOffer();
  }
  getstats() {
    this.dashserv.getStats().subscribe({
      next: (data:any) => {
        console.log('Dashboard stats:', data.cvnombres);
        this.stats.totalCvs = data.cvnombres;
        this.stats.totalLetters=data.letternombres;
        console.log('Total CVs:', this.stats.totalCvs);
        // Handle the data received from the service
      },
      error: (error:any) => {
        console.error('Error fetching dashboard stats:', error);
        // Handle the error appropriately
      }
    });}
    
   
  getstatsOffer() {
    this.dashserv.getStatsOffer().subscribe({
      next: (data:any) => {
        console.log('Dashboard stats:', data);
        this.listoffers= data.recommendedJobs;
        this.stats.savedJobs = data.totalSavedJobs;
        this.listoffersSaved = data.savedJobs;
        // Handle the data received from the service
      },
      error: (error:any) => {
        console.error('Error fetching dashboard stats:', error);
        // Handle the error appropriately
      }
    });
  }
}