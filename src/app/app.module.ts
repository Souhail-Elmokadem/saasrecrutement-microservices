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
import { CreationcvComponent } from './shared/pages/candidate/cv/creationcv/creationcv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './shared/pages/admin/list-users/list-users.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarMinComponent } from './shared/navbar-min/navbar-min.component';
import { AuthInterceptor } from './core/intercepteurs/intercepteur';
import { PreviewcvComponent } from './shared/pages/candidate/cv/previewcv/previewcv.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CandidateComponent } from './shared/pages/candidate/candidate.component';
import { DashboardComponent } from './shared/pages/candidate/dashboard/dashboard.component';
import { MyApplicationsComponent } from './shared/pages/candidate/my-applications/my-applications.component';
import { JobOffersComponent } from './shared/pages/candidate/job-offers/job-offers.component';
import { ChoixTemplateComponent } from './shared/pages/candidate/cv/choix-template/choix-template.component';
import { ModeleClassicComponent } from './shared/pages/candidate/cv/previewcv/modele-classic/modele-classic.component';
import { ModeleEtalentlyComponent } from './shared/pages/candidate/cv/previewcv/modele-etalently/modele-etalently.component';
import { ListCvsComponent } from './shared/pages/candidate/cv/list-cvs/list-cvs.component';
import { ChoixCreationcvComponent } from './shared/pages/candidate/cv/choix-creationcv/choix-creationcv.component';
import { TimeAgoPipe } from './shared/pipes/time-ago.pipe';
import { UpdatecvComponent } from './shared/pages/candidate/cv/updatecv/updatecv.component';
import { CreationlettreComponent } from './shared/pages/candidate/letter/creationlettre/creationlettre.component';
import { ChoixCvGenererLetterComponent } from './shared/pages/candidate/letter/choix-cv-generer-letter/choix-cv-generer-letter.component';
import { PreviewLetterComponent } from './shared/pages/candidate/letter/preview-letter/preview-letter.component';
import { UpdateLetterComponent } from './shared/pages/candidate/letter/update-letter/update-letter.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { PersonnalisationLettreComponent } from './shared/pages/candidate/letter/personnalisation-lettre/personnalisation-lettre.component';

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
    NavbarMinComponent,
    PreviewcvComponent,
    SidebarComponent,
    CandidateComponent,
    DashboardComponent,
    MyApplicationsComponent,
    JobOffersComponent,
    ChoixTemplateComponent,
    ModeleClassicComponent,
    ModeleEtalentlyComponent,
    ListCvsComponent,
    ChoixCreationcvComponent,
    TimeAgoPipe,
    UpdatecvComponent,
    CreationlettreComponent,
    ChoixCvGenererLetterComponent,
    PreviewLetterComponent,
    UpdateLetterComponent,
    LoadingComponent,
    PersonnalisationLettreComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
