import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cv } from '../../../../../models/Cv';
import { CvserviceService } from '../../../../../core/services/cv-service/cvservice.service';
import { LetterService } from '../../../../../core/services/letter-service/letter.service';
import { Letter } from '../../../../../models/Letter';

@Component({
  selector: 'app-list-cvs',
  standalone: false,
  templateUrl: './list-cvs.component.html',
  styleUrl: './list-cvs.component.css'
})
export class ListCvsComponent implements OnInit{







 
  cvs:Cv[]=[];
 
  letters:Letter[]=[];
  constructor(private route:Router,private cvservice:CvserviceService,private letterservice:LetterService ){}
  section!:number;

  ngOnInit(): void {
    this.getCvs();
    this.getLetters();
    localStorage.getItem("section")?this.section=Number(localStorage.getItem("section")):this.section=1;
    if (this.section < 1 || this.section > 3) {
      this.section = 1; // Default to section 1 if the stored value is invalid
    }

  }


  updateSection(number:any){
      this.section=number;
      localStorage.setItem("section",number);
  }

  DeleteCv(cvid: string) {
    if (confirm("Are you sure you want to delete this CV?")) {
      this.cvservice.deleteCv(cvid).subscribe({
        next: (data) => {
          console.log("CV deleted successfully");
          this.getCvs(); // Refresh the list after deletion
          this.getLetters();
        },
        error: (err) => console.error("Failed to delete CV: " + err)
      });
    }
    }
    
  getCvs(){
    this.cvservice.getCvByUser().subscribe({
      next:(data:any)=>{
        this.cvs=data.items;
        console.log(this.cvs)
      },
      error:err=>console.log("failed to : "+err)
    })
  }

  getLetters(){
    this.letterservice.getLetterByUser().subscribe({
      next:(data:any)=>{
        this.letters=data;
        console.log("Letters retrieved successfully:");
        console.log(data);
      }
      , error:(err:any)=>console.log("failed to : "+err)
    })  
  }

goToChoixModele(cvid:string) {
this.route.navigateByUrl("/candidate/modele/"+cvid);
}

GoToCreateCv() {
  this.route.navigateByUrl("/candidate/choixcreationcv")

}
GoToCreateLetter() {
  this.route.navigateByUrl("/candidate/letter/choixcv");
}

goToUpdateLetter(letterId: string) {

  
  this.letterservice.getLetterById(letterId).subscribe({
    next: (data: any) => {
      console.log("Letter retrieved successfully:", data);
      this.route.navigateByUrl("/candidate/letter/update/"+data.cv.id +"/"+ letterId);
    },
    error: (err) => {
      console.error("Error retrieving letter:", err);
    }
  });
}
Deleteletter(letterid: string) {

this.letterservice.deleteLetter(letterid).subscribe({
  next: (data:any) => {
    console.log("Letter deleted successfully");
    this.getLetters(); // Refresh the list after deletion
  }
  , error: (err:any) => console.error("Failed to delete letter: " + err)
  
});
}
  
}
