import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { HomeComponent } from './features/public/home/home.component';
import { CreationcvComponent } from './shared/pages/candidate/creationcv/creationcv.component';
import { ListUsersComponent } from './shared/pages/admin/list-users/list-users.component';
import { canActivateAuthRole } from './core/guards/auth-role.guard';

export const routes: Routes = [

    {path:'',component:HomeComponent},
    {path:'login' , component: LoginComponent},
    {path:'register' , component: RegisterComponent},
    { path: 'cv', component: CreationcvComponent, canActivate: [canActivateAuthRole], data: { role: 'CANDIDAT' } },
    {path:'users' , component: ListUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
