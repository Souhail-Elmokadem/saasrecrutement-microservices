import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private keycloakService: KeycloakService) {}

async login() {
  await this.keycloakService.login(
    {
      redirectUri : window.location.origin
    }
  );
}
}
