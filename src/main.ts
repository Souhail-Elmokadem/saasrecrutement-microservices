import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
  import { createIcons, icons } from 'lucide';

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));



document.addEventListener('DOMContentLoaded', () => {
  createIcons({ icons });
});
