import { Component } from '@angular/core';

@Component({
  selector: 'app-personnalisation-lettre',
  templateUrl: './personnalisation-lettre.component.html',
  standalone: false,
})
export class PersonnalisationLettreComponent {

  // Type de lettre (motivation, recommandation, etc.)
  letterType: string = 'motivation';

  // Poste ciblé
  targetPosition: string = '';

  // Options de personnalisation supplémentaires
  options = {
    formalTone: true,
    includeAchievements: true,
    alignWithJobDesc: false
  };

  constructor() {}

  generateLetter() {
    const payload = {
      type: this.letterType,
      position: this.targetPosition,
      options: this.options
    };

    console.log('📄 Lettre à générer :', payload);

    // Exemple : appel à un service d'IA ou backend
    // this.letterService.generateLetter(payload).subscribe(...)
  }
}
