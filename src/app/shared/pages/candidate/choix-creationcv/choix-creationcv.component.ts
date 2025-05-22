import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CvserviceService } from '../../../../core/services/cv-service/cvservice.service';

@Component({
  selector: 'app-choix-creationcv',
  standalone: false,
  templateUrl: './choix-creationcv.component.html',
  styleUrl: './choix-creationcv.component.css'
})
export class ChoixCreationcvComponent {
affichernotif() {
  alert("fill resume name")
}


  isLoading:Boolean=false;
  cvName:string='';
  cvId:string='';
  constructor(private route:Router,private cvservice:CvserviceService){
    
  }

  GoToCreationCv() {
    this.cvName=this.cvName.replaceAll(" ","")
    if(this.cvName.length>2){
      this.route.navigateByUrl("/candidate/cv/"+this.cvName)
    }else{
      alert("fill resume name")
    }
 }

 onFileSelected(event: Event): void {
  if(this.cvName.length>3)
  {
    const input = event.target as HTMLInputElement;
  const file = input?.files?.[0];


  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('cvName', this.cvName); // ou autre champ si nécessaire

    this.isLoading=true
    console.log("hhh")
    this.cvservice.createcvfromlocal(formData).subscribe({
      next:(data)=>{
          console.log(data)
          this.cvId=data.cv.id
          
          this.route.navigateByUrl('candidate/cv/uploaded/'+this.cvId)
        this.isLoading=false
      }
    })
    
  }
  }else{
   
    alert("fill resume name")
  }
  

 
 }


}
