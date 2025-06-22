import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ScriptLoaderService } from '../../../core/services/loaderScript/script-loader-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../../models/User';

// Déclarations globales pour les bibliothèques JS utilisées
declare var AOS: any;
declare var GLightbox: any;
declare var Swiper: any;
declare var PureCounter: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit,OnDestroy {


  constructor(private scriptLoader:ScriptLoaderService,private router: Router,private authservice:AuthService) {}
 
  isLoading: boolean = true;
  isAuthenticated: boolean = false;
  user!:User;
  private loadedScripts: string[] = [];
  private loadedStyles: string[] = [];
  
goToDashboard() {
this.router.navigateByUrl('/candidate/listcvs');
}


  ngOnInit(): void {
      this.isAuthenticated = this.authservice.isAuthenticated();
      if (this.isAuthenticated) {
        this.authservice.getMe().subscribe({
          next: (data:any) => {
          this.user = data;
            if (this.user) {
              console.log('User data:', this.user);
              this.isAuthenticated = true;
              console.log('User data1:', this.user);
            } else {
              this.isAuthenticated = false;
            }
          }
          , error: (err) => {
            console.error('Error fetching user data:', err);
            this.isAuthenticated = false;
          }
        });
      }
  setTimeout(() => {
    this.isLoading = false;
 
  }, 200); // simulate loading (2 sec)
  if (this.router.url !== '/' && this.router.url !== '/home') return;

    window.addEventListener('scroll', this.toggleScrolled);
    window.addEventListener('scroll', this.toggleScrollTop);
    window.addEventListener('scroll', this.navmenuScrollspy);

    window.addEventListener('load', () => {
      this.toggleScrolled();
      this.toggleScrollTop();
      this.navmenuScrollspy();
      this.initSwiper();
      this.initAOS();
      this.scrollToHash();
    });
  }

 async ngAfterViewInit(): Promise<void>  {

  if (this.router.url !== '/' && this.router.url !== '/home') return;
    try {
      this.loadedStyles = [
        '/assets/vendor/bootstrap/css/bootstrap.min.css',
        '/assets/vendor/bootstrap-icons/bootstrap-icons.css',
        '/assets/vendor/aos/aos.css',
        '/assets/vendor/glightbox/css/glightbox.min.css',
        '/assets/vendor/swiper/swiper-bundle.min.css',
        '/assets/css/main.css'
      ];
      
      this.loadedScripts = [
        '/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
        '/assets/vendor/php-email-form/validate.js',
        '/assets/vendor/aos/aos.js',
        '/assets/vendor/glightbox/js/glightbox.min.js',
        '/assets/vendor/swiper/swiper-bundle.min.js',
        '/assets/vendor/purecounter/purecounter_vanilla.js'
      ];
      
      await this.scriptLoader.loadAllStyles(this.loadedStyles);
      await this.scriptLoader.loadAllScripts(this.loadedScripts);
      
      this.initFeatures();
    } catch (err) {
      console.error(err);
    }
  }
  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
    }

    ngOnDestroy(): void {
      this.scriptLoader.unloadAllScripts(this.loadedScripts);
      this.scriptLoader.unloadAllStyles(this.loadedStyles);
    
      window.removeEventListener('scroll', this.toggleScrolled);
      window.removeEventListener('scroll', this.toggleScrollTop);
      window.removeEventListener('scroll', this.navmenuScrollspy);
    }
    
    
  initFeatures(): void {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    new GLightbox({ selector: '.glightbox' });
    new Swiper('.init-swiper', { loop: true });
    new PureCounter();

    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle') as HTMLElement | null;
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', () => this.toggleMobileNav(mobileNavToggleBtn));
    }

    const navLinks = document.querySelectorAll<HTMLAnchorElement>('#navmenu a');
    navLinks.forEach(nav => {
      nav.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active') && mobileNavToggleBtn) {
          this.toggleMobileNav(mobileNavToggleBtn);
        }
      });
    });

    const dropdownToggles = document.querySelectorAll('.navmenu .toggle-dropdown');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = toggle.parentElement;
        const next = parent?.nextElementSibling;
        parent?.classList.toggle('active');
        next?.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    const faqToggles = document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle');
    faqToggles.forEach(faq => {
      faq.addEventListener('click', () => {
        faq.parentElement?.classList.toggle('faq-active');
      });
    });

    if (document.querySelector('.glightbox')) {
      new GLightbox({ selector: '.glightbox' });
    }
    new PureCounter();

    const scrollTop = document.querySelector('.scroll-top') as HTMLElement | null;
    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  toggleScrolled(): void {
    const body = document.body;
    const header = document.querySelector('#header');
    if (!header?.classList.contains('scroll-up-sticky') &&
        !header?.classList.contains('sticky-top') &&
        !header?.classList.contains('fixed-top')) return;

    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }

  toggleScrollTop(): void {
    const scrollTop = document.querySelector('.scroll-top') as HTMLElement | null;
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  toggleMobileNav(btn: HTMLElement): void {
    document.body.classList.toggle('mobile-nav-active');
    btn.classList.toggle('bi-list');
    btn.classList.toggle('bi-x');
  }

  initAOS(): void {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  initSwiper(): void {
    const swiperElements = document.querySelectorAll('.init-swiper');
    swiperElements.forEach(swiperEl => {
      const configScript = swiperEl.querySelector('.swiper-config');
      if (configScript) {
        try {
          const config = JSON.parse(configScript.textContent || '{}');
          new Swiper(swiperEl as HTMLElement, config);
        } catch (err) {
          console.error('Swiper config JSON parse error:', err);
        }
      }
    });
  }

  scrollToHash(): void {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: (section as HTMLElement).offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }

  navmenuScrollspy(): void {
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.navmenu a');
    const position = window.scrollY + 200;

    navLinks.forEach(link => {
      const hash = link.hash;
      if (!hash) return;
      const section = document.querySelector(hash);
      if (!section) return;

      if (position >= (section as HTMLElement).offsetTop &&
          position <= (section as HTMLElement).offsetTop + (section as HTMLElement).clientHeight) {
        document.querySelectorAll('.navmenu a.active').forEach(activeLink => activeLink.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
