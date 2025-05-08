import {  APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { CardComponent } from './shared/components/card/card.component';
import { HomeComponent } from './features/public/home/home.component';
import { provideRouter } from '@angular/router';


import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { keycloakConfig } from './keycloak-config';
import { CreationcvComponent } from './shared/pages/candidate/creationcv/creationcv.component';
import { FormsModule } from '@angular/forms';
import { ListUsersComponent } from './shared/pages/admin/list-users/list-users.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarMinComponent } from './shared/navbar-min/navbar-min.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: keycloakConfig.config,
      initOptions: keycloakConfig.initOptions
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    HomeComponent,
    CreationcvComponent,
    ListUsersComponent,
    NavbarMinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    KeycloakService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
