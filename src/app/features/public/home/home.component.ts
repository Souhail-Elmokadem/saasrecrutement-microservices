import { Component, AfterViewInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import 'swiper/css/bundle';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
MoveToCvBuild() {
    console.log("moved")
}
  
  constructor(private keycloak: KeycloakService) {
    const isLogged = this.keycloak.isLoggedIn();      
      console.log('✅ Is logged in:', isLogged);
      console.log('🔑 Token:', keycloak.getKeycloakInstance().token);
      console.log('🎭 Roles:', keycloak.getUserRoles());
      
    
  }
}
