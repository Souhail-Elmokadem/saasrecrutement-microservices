import { Component } from '@angular/core';
import { CvserviceService } from '../../../../core/services/cv-service/cvservice.service';

@Component({
  selector: 'app-creationcv',
  templateUrl: './creationcv.component.html',
  standalone:false,
  styleUrls: ['./creationcv.component.css'],
})
export class CreationcvComponent {
  step = 1;
  image = 'https://placehold.co/300x300/e2e8f0/cccccc?text=Profile';
  password = '';
  experience = [{ title: '', company: '', duration: '', description: '' }];
  gender = 'Male';
  passwordStrengthText = '';
  togglePassword = false;
  competenceInput = '';
  competences: string[] = [];
  firstName!:string;
  lastName!:string;
  interestInput = '';
  centreInterets: string[] = [];
  fullname = '';
  email = '';
  tel = '';
  profession = '';
  profile = '';
  formations = [{ diploma: '', school: '', year: '' }];

  cvJSON: string = '';

  constructor(private cvservice:CvserviceService){

  }
  nextStep() {
    if (this.step < 5) this.step++;
  }

  previousStep() {
    if (this.step > 1) this.step--;
  }

  completeRegistration() {
    const cv = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      tel: this.tel,
      gender: this.gender,
      profession: this.profession,
      profile: this.profile,
      competences: this.competences,
      centreInterets: this.centreInterets,
      experience: this.experience,
      formations: this.formations,
    };
    this.cvJSON = JSON.stringify(cv, null, 2);
    this.step = 5;
    console.log(this.cvJSON); // For debugging purposes
    
    this.cvservice.createCv(cv).subscribe({
      next: (response) => {
        console.log('CV enregistré avec succès', response);
        this.step = 5;
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement', err);
      }
    });
  }
  reset() {
    this.step = 1;
    this.cvJSON = '';
  }
  addExperience() {
    this.experience.push({ title: '', company: '', duration: '', description: '' });
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => this.image = e.target?.result as string;
    reader.readAsDataURL(file);
  }
  checkPasswordStrength() {
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])(?=.{8,})/;
    const medium = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (strong.test(this.password)) {
      this.passwordStrengthText = 'Strong password';
    } else if (medium.test(this.password)) {
      this.passwordStrengthText = 'Could be stronger';
    } else {
      this.passwordStrengthText = 'Too weak';
    }
  }
  addCompetence() {
    if (this.competenceInput) {
      this.competences.push(this.competenceInput);
      this.competenceInput = '';
    }
  }

  addInterest() {
    if (this.interestInput) {
      this.centreInterets.push(this.interestInput);
      this.interestInput = '';
    }
  }
  addFormation() {
    this.formations.push({ diploma: '', school: '', year: '' });
  }
}
