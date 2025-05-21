import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService,private router:Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.loginService.login(email, password).subscribe({
      next: (response:any) => {

        localStorage.setItem('access_token', response.access_token); // ou response.token selon ton backend
        console.log('Login réussi');

        this.loginService.getMe().subscribe({
          next: (userInfo) => {
            console.log('Infos utilisateur :', userInfo);
            localStorage.setItem('user_info', JSON.stringify(userInfo));
            this.router.navigateByUrl('/');
          },
          error: (e) => console.error('Erreur lors de la récupération des infos', e)
        });
        this.router.navigateByUrl("/")
      },
      error: (err) => {
        console.error('Échec de la connexion', err);
      }
    });
  }
}
