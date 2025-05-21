import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-choix-template',
  standalone: false,
  templateUrl: './choix-template.component.html',
  styleUrl: './choix-template.component.css'
})
export class ChoixTemplateComponent {


  constructor(private route:Router,private active:ActivatedRoute){

  }

  handleCvPreview(template: any) {
      this.route.navigateByUrl('/candidate/preview/classic/'+this.active.snapshot.paramMap.get('id')!)
}


  templates = [
    { name: 'Modèle Classique', value: 'classic', preview: 'templates/classic.png' },
    { name: 'Modèle Moderne', value: 'modern', preview: 'templates/modern.png' },
    { name: 'Modèle Créatif', value: 'creative', preview: 'templates/creative.png' }
  ];
  
  selectedTemplate = 'classic';
  
  selectTemplate(template: any) {
    this.selectedTemplate = template.value;
  }
  
}
