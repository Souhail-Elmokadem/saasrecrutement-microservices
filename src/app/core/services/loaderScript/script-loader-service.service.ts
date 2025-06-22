import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(`Erreur chargement script: ${src}`);
      document.body.appendChild(script);
    });
  }

  loadStyle(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`link[href="${href}"]`)) return resolve();

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      link.onerror = () => reject(`Erreur chargement style: ${href}`);
      document.head.appendChild(link);
    });
  }

  loadAllScripts(scripts: string[]): Promise<void[]> {
    return Promise.all(scripts.map(src => this.loadScript(src)));
  }

  loadAllStyles(styles: string[]): Promise<void[]> {
    return Promise.all(styles.map(href => this.loadStyle(href)));
  }
  unloadScript(src: string): void {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) {
      script.remove();
      console.log(`✅ Script removed: ${src}`);
    }
  }
  
  unloadStyle(href: string): void {
    const link = document.querySelector(`link[href="${href}"]`);
    if (link) {
      link.remove();
      console.log(`✅ Style removed: ${href}`);
    }
  }
  unloadAllScripts(scripts: string[]): void {
    scripts.forEach(src => this.unloadScript(src));
  }
  
  unloadAllStyles(styles: string[]): void {
    styles.forEach(href => this.unloadStyle(href));
  }
    
}
