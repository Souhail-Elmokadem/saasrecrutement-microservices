import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cv } from '../../../../../models/Cv';
import { CvserviceService } from '../../../../../core/services/cv-service/cvservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from '../../../../../models/Experience';
import { Education } from '../../../../../models/Educations';

@Component({
  selector: 'app-updatecv',
  standalone: false,
  templateUrl: './updatecv.component.html',
  styleUrl: './updatecv.component.css'
})
export class UpdatecvComponent  implements OnInit {
  // Contact Info
    fullName = '';
    email = '';
    phone = '';
    linkedin = '';
    website = '';
    state = '';
    country = '';
    summary='';
    title='';
    cvidparam:string='';
    cvName:string='';
    cv!:Cv;
  
  
 
  
  

    constructor(private cvservice:CvserviceService,private route:Router,private active:ActivatedRoute,  private cdr: ChangeDetectorRef 
    ){}
  ngOnInit(): void {
     this.cvidparam = this.active.snapshot.paramMap.get("id")!;
     

     if(this.cvidparam !=''){
    
          this.cvservice.getCvById(this.cvidparam).subscribe(
            {
              next:(data:any)=>{
                console.log("after call")
                this.cv=data;
                console.log("data")
                this.populateFormFromCv(this.cv)
                this.cdr.detectChanges(); 
              },
              error:err=>console.log(err)
            }
          )
     }
    }
   
  
     // Sections


     
     private populateFormFromCv(cv: Cv): void {
      this.fullName = cv.fullName || '';
      this.email = cv.email || '';
      this.phone = cv.phone || '';
      this.linkedin = cv.linkedin || '';
      this.website = cv.website || '';
      this.cvName=cv.cvName || '';
      this.state = cv.state || '';
      this.country = cv.country || '';
      this.summary = cv.summary || '';
      this.title = cv.title || '';
      this.skills = Array.isArray(cv.skills) ? cv.skills : [];
    
      this.experiences = Array.isArray(cv.experiences) && cv.experiences.length > 0
      ? cv.experiences.map(exp => ({
          ...exp,
          start_date: exp.start_date,
          end_date: exp.end_date
        }))
      : [{
          title: '',
          company: '',
          start_date: '',
          end_date: '',
          location: '',
          description: ''
        }];
    this.currentExperienceIndex = 0;
    
    this.educations = Array.isArray(cv.educations) && cv.educations.length > 0
    ? cv.educations.map(edu => ({
        ...edu,
        start_date: edu.start_date,
        end_date: edu.end_date
      }))
    : [{
        school: '',
        degree: '',
        branch: '',
        start_date: '',
        end_date: ''
      }];
  this.currentEducationIndex = 0;
  
    }
  
        
photoFile?: File;
photoPreview: string | ArrayBuffer | null = null;

onPhotoSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input?.files?.[0];
  if (!file) return;

  // Option : tu peux vérifier le type et la taille ici
  if (!file.type.startsWith('image/')) {
    alert('Merci de choisir une image.');
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert('Image trop volumineuse (max 2 Mo).');
    return;
  }

  this.photoFile = file;
  // Générer un aperçu
  const reader = new FileReader();
  reader.onload = e => {
    this.photoPreview = reader.result;
  };
  reader.readAsDataURL(file);
}  
    
  



   sections = [
        { label: 'Contact', value: 'contact' },
        { label: 'Experience', value: 'experience' },
        { label: 'Education', value: 'education' },
        { label: 'Skills', value: 'skills' },
        { label: 'Summary', value: 'summary' }
      ];
      
      currentSection: string = 'contact';
      
     
      openedMenuIndex: number | null = null;

      toggleMenu(index: number): void {
        this.openedMenuIndex = this.openedMenuIndex === index ? null : index;
      }
      
      currentExperienceIndex: number=0;
      currentEducationIndex: number=0;
    
      switchSection(section: string): void {
        this.currentSection = section;
      }
    
      addExperience(): void {
        this.experiences.push({
          title: '',
          company: '',
          start_date: '',
          end_date: '',
          location: '',
          description: ''
        });
      }
      addEducation(): void {
        this.educations.push({
          school:'',
          degree:'',
          branch:'',
          start_date:'',
          end_date:''
        });
      }
    
      selectExperience(index: number): void {
        this.currentExperienceIndex = index;
      }
    
     
      
      experiences: Experience[]=[
        {
          title: '',
          company: '',
          start_date: '',
          end_date: '',
          location: '',
          description: ''
        }
      ]; 
      educations: Education[]=[
        {
          school:'',
          degree:'',
          branch:'',
          start_date:'',
          end_date:'',
        }
      ];
      
      selectEducation(index: number): void {
        this.currentEducationIndex = index;
      }
    
      
      updateExperienceField(field: keyof Experience, value: string): void {
        this.experiences[this.currentExperienceIndex][field] = value;
      } 
      updateEducationField(field: keyof Education, value: string): void {
        this.educations[this.currentEducationIndex][field] = value;
      }
      
      removeExperience(index: number): void {
        this.experiences.splice(index, 1);
      
        if (this.experiences.length === 0 || this.experiences.length === 1) {
          this.currentExperienceIndex = -1;
          return;
        }
      
        if (this.currentExperienceIndex >= this.experiences.length) {
          this.currentExperienceIndex = this.experiences.length - 1;
        }
      }
      
      removeEducation(index: number): void {
        this.educations.splice(index, 1);
      
        if (this.educations.length === 0 || this.educations.length === 1) {
          this.currentExperienceIndex = -1;
          return;
        }
      
        if (this.currentExperienceIndex >= this.educations.length) {
          this.currentExperienceIndex = this.educations.length - 1;
        }
      }
    
    
      
    
      newSkill: string = '';
  skills: string[] = [];
  
  addSkill() {
    const trimmed = this.newSkill.trim();
    if (trimmed && !this.skills.includes(trimmed)) {
      this.skills.push(trimmed);
    }
    this.newSkill = '';
  }
  
  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }
  
  saveBasicInfo() {
        console.log('Contact saved', {
          fullName: this.fullName,
          email: this.email,
          phone: this.phone,
          linkedin: this.linkedin,
          website: this.website,
          state: this.state,
          country: this.country
        });
      }
      exportCv(): void {
        const cvData = {
          id:this.cvidparam,
          fullName: this.fullName,
          email: this.email,
          phone: this.phone,
          cvName:this.cvName,
          linkedin: this.linkedin,
          website: this.website,
          photoUrl: this.cv.photoUrl,
          modeleName: this.cv.modeleName,
          state: this.state,
          updatedAt:'',
          title: this.title,
          country: this.country,
          summary: this.summary,
          skills: this.skills,
          experiences: this.experiences,
          educations: this.educations
        };
      
        this.cv = cvData;
      
      
        if(this.cvidparam != ''){
          this.cvservice.updateCv(cvData,this.photoFile!).subscribe({
            next:(data:any)=>{
              console.log(data);
              console.log("success updated")
              this.route.navigateByUrl("/candidate/listcvs")
            },
            error:err=>console.log(err)
          })
          console.log("✅ Exported CV Data:", this.cv);
  
  
        }
       
  
        
        // Optional: trigger download
        // const blob = new Blob([JSON.stringify(cvData, null, 2)], { type: 'application/json' });
        // const url = window.URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'cv-export.json';
        // a.click();
        // window.URL.revokeObjectURL(url);
  
       
      }
  
}
