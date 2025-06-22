import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { createIcons, icons } from 'lucide';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit, AfterViewInit , AfterViewChecked {

  roteur() {
  this.router.navigateByUrl('/candidate/listcvs')
}

  isMinimized = false;
  iconsInitialized = false;

  listOfMinimizedUrls = [
    '/candidate/preview',
    '/candidate/letter/preview',
    'candidate/cv',
    '/choixcreationcv'
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects || event.url;
        this.isMinimized = this.listOfMinimizedUrls.some(url => currentUrl.includes(url));
      });
  }
  ngOnInit(): void {
    console.log(this.isMinimized)
  }

  toggleSidebar() {
    this.isMinimized = !this.isMinimized;
  }

  ngAfterViewInit(): void {
    createIcons({ icons, attrs: {}, nameAttr: 'data-lucide' });
  }
  
  
  ngAfterViewChecked(): void {
    if (!this.iconsInitialized) {
      createIcons({ icons });
      this.iconsInitialized = true;
    }
  }
  

}
