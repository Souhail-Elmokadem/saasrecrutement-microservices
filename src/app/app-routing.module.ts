import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { HomeComponent } from './features/public/home/home.component';
import { CreationcvComponent } from './shared/pages/candidate/creationcv/creationcv.component';
import { ListUsersComponent } from './shared/pages/admin/list-users/list-users.component';
import { AuthGuard } from './core/guards/auth-role.guard';
import { PreviewcvComponent } from './shared/pages/candidate/previewcv/previewcv.component';
import { CandidateComponent } from './shared/pages/candidate/candidate.component';
import { DashboardComponent } from './shared/pages/candidate/dashboard/dashboard.component';
import { MyApplicationsComponent } from './shared/pages/candidate/my-applications/my-applications.component';
import { JobOffersComponent } from './shared/pages/candidate/job-offers/job-offers.component';
import { ChoixTemplateComponent } from './shared/pages/candidate/choix-template/choix-template.component';
import { ModeleClassicComponent } from './shared/pages/candidate/previewcv/modele-classic/modele-classic.component';
import { ListCvsComponent } from './shared/pages/candidate/list-cvs/list-cvs.component';
import { ChoixCreationcvComponent } from './shared/pages/candidate/choix-creationcv/choix-creationcv.component';
import { UpdatecvComponent } from './shared/pages/candidate/updatecv/updatecv.component';

export const routes: Routes = [

    {path:'',component:HomeComponent},
    {path:'login' , component: LoginComponent},
    {path:'register' , component: RegisterComponent},
    { path: 'cv', redirectTo: 'candidate/choixcreationcv', pathMatch: 'full' },
   
    {path:'users' , component: ListUsersComponent,canActivate: [AuthGuard],
      data: { roles: ['RH']}},


      {path:'candidate',component:CandidateComponent,children:[
        { path: 'cv/:name', component: CreationcvComponent,   canActivate: [AuthGuard],
          data: { roles: ['CANDIDAT']}},
          { path: 'cv/uploaded/:id', component: CreationcvComponent,   canActivate: [AuthGuard],
            data: { roles: ['CANDIDAT']}}
          ,{ path: 'cv/update/:id', component: UpdatecvComponent,   canActivate: [AuthGuard],
            data: { roles: ['CANDIDAT']}},
        {path:'modele/:id' , component: ChoixTemplateComponent},

        
        {path:'listcvs' , component: ListCvsComponent },
        {path:'choixcreationcv' , component: ChoixCreationcvComponent },

        {path:'preview' , component: PreviewcvComponent , children:[
          {path:'classic/:id',component:ModeleClassicComponent}
        ]} ,
        {path:'myapplications' , component: MyApplicationsComponent},
        {path:'jobs' , component: JobOffersComponent},
        {path:'dashboard' , component: DashboardComponent},
        {path:'' ,redirectTo:'dashboard', pathMatch:'full'},
      ],canActivate: [AuthGuard],
      data: { roles: ['CANDIDAT']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
