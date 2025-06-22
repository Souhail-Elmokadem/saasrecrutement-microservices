import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-candidate',
  standalone: false,
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit {
  
  
  isLoading: boolean = true;


ngOnInit(): void {
   
  setTimeout(() => {
    this.isLoading = false;
 
  }, 200); 
  }

}
