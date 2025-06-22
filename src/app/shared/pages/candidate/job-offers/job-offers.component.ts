import { Component, OnInit } from '@angular/core';
import { OffreService } from '../../../../core/services/offre-service/offre.service';
import { Offer } from '../../../../models/Offre';

@Component({
  selector: 'app-job-offers',
  standalone: false,
  templateUrl: './job-offers.component.html',
  styleUrl: './job-offers.component.css'
})
export class JobOffersComponent implements OnInit {

  

  offers:Offer [] = [];
  kw:string = '';
  size:number = 6;
  page:number = 0;

  totalPages: number = 0;
  totalItems: number = 0;

  // job-offers.component.ts
  constructor(private offreservice:OffreService) { }

  ngOnInit(): void {
   this.getOffers(this.kw, this.size, this.page);
  }
// offers.component.ts

parseMissions(missions: string): string[] {
  try {
    return JSON.parse(missions);
  } catch (e) {
    // En cas de texte brut
    return [missions];
  }
}

  getOffers(kw:string = '', size:number = 6, page:number = 0): void {
  this.offreservice.getAllOffers(this.kw,this.size,this.page).subscribe({
    next: (data: any) => {
      this.offers = data.items;
      this.totalPages = data.totalPages;
      this.totalItems = data.totalItems;
      console.log('Offers fetched successfully:', this.offers);
    } 
    ,
    error: (error) => {
      console.error('Error fetching offers:', error);
    }
  });

}

changePage(newPage: number) {
  if (newPage >= 0 && newPage < this.totalPages) {
    this.page = newPage;
    this.getOffers(this.kw, this.size, newPage);
  }
}


  filterOffers() {

    this.getOffers(this.kw, this.size, this.page);}


    getPaginationRange(): number[] {
      const delta = 2;
      const range = [];
      const left = Math.max(0, this.page - delta);
      const right = Math.min(this.totalPages - 1, this.page + delta);
    
      for (let i = left; i <= right; i++) {
        range.push(i);
      }
    
      if (left > 1) {
        range.unshift(-1); // représente "..."
        range.unshift(0);
      } else if (left === 1) {
        range.unshift(0);
      }
    
      if (right < this.totalPages - 2) {
        range.push(-2); // représente "..."
        range.push(this.totalPages - 1);
      } else if (right === this.totalPages - 2) {
        range.push(this.totalPages - 1);
      }
    
      return range;
    }
    
}

