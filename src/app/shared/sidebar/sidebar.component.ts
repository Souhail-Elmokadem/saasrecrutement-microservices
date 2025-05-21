import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  roteur() {
  this.router.navigateByUrl('/candidate/listcvs')
}

  isMinimized = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isMinimized = event.url.includes('/candidate/preview');
      });
  }
  ngOnInit(): void {
    console.log(this.isMinimized)
  }
}
