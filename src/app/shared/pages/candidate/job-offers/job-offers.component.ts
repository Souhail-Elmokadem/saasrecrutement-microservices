import { Component, OnInit } from '@angular/core';
import { OffreService } from '../../../../core/services/offre-service/offre.service';
import { Offer } from '../../../../models/Offre';
import { SavedJob } from '../../../../models/SavedJob';

@Component({
  selector: 'app-job-offers',
  standalone: false,
  templateUrl: './job-offers.component.html',
  styleUrl: './job-offers.component.css'
})
export class JobOffersComponent implements OnInit {


isSaved(offerId:number): any {
  if (this.offerssaved && this.offerssaved.length > 0) {
    return this.offerssaved.some(savedJob => savedJob.job.id === offerId);
  }
  return false;
}


  

  offers:Offer [] = [];
  offerssaved:SavedJob [] = [];
  offerrecommended:Offer [] = [];
  kw:string = '';
  size:number = 6;
  page:number = 0;
  lengthoffersSaved:number = 0;
  section:number=0;
  totalPages: number = 0;
  totalItems: number = 0;

  sizeSaved:number = 6;
  pageSaved:number = 0;
  TotalItemsSaved: number = 0;
  TotalPagesSaved: number = 0;

  lentghOffers: number = 0;

  updateSection(section: number) {
    this.section = section;
    this.page = 0; // Réinitialiser la page à 0 lors du changement de section
    if (section === 0) {
      this.getOffers(this.kw, this.size, this.page);
    }
    else if (section === 1) {
      this.getOffersSaved(this.kw, this.size, this.page);
    }

  }

  // job-offers.component.ts
  constructor(private offreservice:OffreService) { }

  ngOnInit(): void {
    
    this.getOffersSaved(this.kw, this.size, this.page);
    this.getOffers(this.kw, this.size, this.page);
    this.getRecommendedOffers(this.kw, this.size, this.page);
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

cityQuery: string = '';
citySuggestions: any[] = [];
selectedCity: any = null;

AddToSavedJob(offerid:number): void {
  console.log('Saving offer with ID:', offerid);
  this.offreservice.saveJob(offerid).subscribe({
    next: (data: any) => {
      console.log('Offer saved successfully:', data);
      // Optionnel : Mettre à jour l'affichage ou notifier l'utilisateur
    },
    error: (error) => {
      console.error('Error saving offer:', error);
    }
  });
}
DeleteSavedJob(savedJobId: number): void {
  console.log('Deleting saved job with ID:', savedJobId);
  this.offreservice.deleteSavedJob(savedJobId).subscribe({
    next: (data: any) => {
      console.log('Saved job deleted successfully:', data);
      // Optionnel : Mettre à jour l'affichage ou notifier l'utilisateur    
      this.getOffersSaved(this.kw, this.sizeSaved, this.pageSaved); // Rafraîchir la liste des offres sauvegardées
    }
    ,
    error: (error) => {
      console.error('Error deleting saved job:', error);
    }
  });
}
toggleSavedJob(offerId: number): void {
  const saved = this.offerssaved.find(savedJob => savedJob.job.id === offerId);

  if (saved) {
    // Supprimer
    this.offreservice.deleteSavedJob(saved.savedJobId).subscribe({
      next: () => {
        console.log('Removed from saved');
        // Enlever manuellement du tableau
        this.offerssaved = this.offerssaved.filter(s => s.job.id !== offerId);
      },
      error: (err) => console.error('Error removing:', err)
    });
  } else {
    // Ajouter
    this.offreservice.saveJob(offerId).subscribe({
      next: (data: any) => {
        console.log('Added to saved');
        this.offerssaved.push(data); // tu peux re-fetch sinon
      },
      error: (err) => console.error('Error adding:', err)
    });
  }
}


searchCity() {
  if (this.cityQuery.length < 3) {
    this.citySuggestions = [];
    return;
  }

  fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=ma&accept-language=fr&q=${encodeURIComponent(this.cityQuery)}&limit=5`)
  .then(res => res.json())
  .then(data => {
    console.log('City suggestions:', data);
    // Garder seulement le nom de ville (on peut affiner ensuite)
    this.citySuggestions = data
      .filter((item:any) => item.type === 'city' || item.class === 'place') // optionnel
      .map((item:any) => ({
        display_name: item.display_name,
        city: item.address.city || item.address.town || item.address.village || item.address.state,
        lat: item.lat,
        lon: item.lon
      }));
  });

    
}

selectCity(city: any) {
  this.selectedCity = city;
  this.cityQuery = city.display_name;
  this.citySuggestions = [];

  // Ensuite, applique le filtre par ville
  this.getOffers(this.kw,this.size,this.page,city.name); // méthode personnalisée
}


getOffers(kw:string = '',size:number = 6, page:number = 0,city:string=''): void {
  this.offreservice.getAllOffers(this.kw,this.size,this.page,city).subscribe({
    next: (data: any) => {
      this.offers = data.items;
      this.totalPages = data.totalPages;
      this.totalItems = data.totalItems;
      this.lentghOffers = data.totalItems;
      console.log('Offers fetched successfully:', this.offers);
    } 
    ,
    error: (error) => {
      console.error('Error fetching offers:', error);
    }
  });
  
}
getOffersSaved(kw:string = '',size:number = 6, page:number = 0,city:string=''): void {
  this.offreservice.getAllOffersSaved(this.kw,this.sizeSaved,this.pageSaved,city).subscribe({
    next: (data: any) => {
      this.offerssaved = data.items;
      this.TotalItemsSaved = data.totalItems;
      this.TotalPagesSaved = data.totalPages;
      console.log('Offers fetched successfully:', this.offers);
      this.lengthoffersSaved = this.offerssaved.length;
        
    } 
    ,
    error: (error) => {
      console.error('Error fetching offers:', error);
    }
  });

}
getRecommendedOffers(kw:string = '',size:number = 6, page:number = 0,city:string=''): void {
  this.offreservice.getRecommendedOffers(kw,size,page,city).subscribe({
    next: (data: any) => {
      this.offerrecommended = data;
      console.log('Recommended offers fetched successfully:', this.offerrecommended);   
    }
    ,
    error: (error) => {
      console.error('Error fetching recommended offers:', error);
    }
  });
}

changePage(newPage: number) {
  if (newPage >= 0 && newPage < this.totalPages) {
    this.page = newPage;
    this.getOffers(this.kw, this.size, newPage);
  }
}
changePageSaved(newPage: number) {
  if (newPage >= 0 && newPage < this.TotalPagesSaved) {
    this.pageSaved = newPage;
    this.getOffersSaved(this.kw, this.sizeSaved, newPage);
  }
}

  filterOffers() {

    this.getOffers(this.kw, this.size, this.page);
  
  }


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
    getPaginationRangeforOfferSaved(): number[] {
      const delta = 2;
      const range = [];
      const left = Math.max(0, this.pageSaved - delta);
      const right = Math.min(this.TotalPagesSaved - 1, this.pageSaved + delta);
    
      for (let i = left; i <= right; i++) {
        range.push(i);
      }
    
      if (left > 1) {
        range.unshift(-1); // représente "..."
        range.unshift(0);
      } else if (left === 1) {
        range.unshift(0);
      }
    
      if (right < this.TotalPagesSaved - 2) {
        range.push(-2); // représente "..."
        range.push(this.TotalPagesSaved - 1);
      } else if (right === this.TotalPagesSaved - 2) {
        range.push(this.TotalPagesSaved - 1);
      }
    
      return range;
    }
    
}

