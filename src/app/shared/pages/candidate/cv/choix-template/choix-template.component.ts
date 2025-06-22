import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CvserviceService } from '../../../../../core/services/cv-service/cvservice.service';
import { Cv } from '../../../../../models/Cv';

@Component({
  selector: 'app-choix-template',
  standalone: false,
  templateUrl: './choix-template.component.html',
  styleUrl: './choix-template.component.css'
})
export class ChoixTemplateComponent implements OnInit {


  constructor(private route:Router,private active:ActivatedRoute,private cvservice:CvserviceService){

  }

  cv!:Cv;
  ngOnInit(): void {
    this.cvservice.getCvById(this.active.snapshot.paramMap.get('id')!).subscribe({
      next: (data) => {
        console.log("CV data retrieved:", data);
        this.cv = data;
      }
      ,
      error: (error) => {
        console.error('Error retrieving CV data:', error);
      }
    });
  }

  handleCvPreview(template: any) {
      if(template.value === 'classic') {

      this.cvservice.updateModeleCv(this.active.snapshot.paramMap.get('id')!, template.value).subscribe({
        next: (data) => {
          console.log('CV updated with template:', data);
          this.route.navigateByUrl('/candidate/preview/classic/'+this.active.snapshot.paramMap.get('id')!)

        },
        error: (error) => {
          console.error('Error updating CV with template:', error);
        }
      });


      }else if(template.value === 'modern') {
      this.cvservice.updateModeleCv(this.active.snapshot.paramMap.get('id')!, template.value).subscribe({
        next: (data) => {
          console.log('CV updated with template:', data);      
          this.route.navigateByUrl('/candidate/preview/modern/'+this.active.snapshot.paramMap.get('id')!)

        },
        error: (error) => {
          console.error('Error updating CV with template:', error);
        }
      }); 

      }else if(template.value === 'creative') {

      this.cvservice.updateModeleCv(this.active.snapshot.paramMap.get('id')!, template.value).subscribe({
        next: (data) => {
          console.log('CV updated with template:', data);
          this.route.navigateByUrl('/candidate/preview/creative/'+this.active.snapshot.paramMap.get('id')!)

        },
        error: (error) => {
          console.error('Error updating CV with template:', error);
        }
      });

      }
      else {
        console.error('Template not found');
      }
}


  templates = [
    { name: 'Modèle Classique', value: 'classic', preview: 'assets/templates/classic.png' },
    { name: 'Modèle Moderne', value: 'modern', preview: 'assets/templates/modern.png' },
    { name: 'Modèle Créatif', value: 'creative', preview: 'assets/templates/creative.png' }
  ];
  
  selectedTemplate = 'classic';
  
  selectTemplate(template: any) {
    this.selectedTemplate = template.value;
  }
  
}
