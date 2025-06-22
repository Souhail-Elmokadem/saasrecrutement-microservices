import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { LetterService } from '../../../../../core/services/letter-service/letter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Letter } from '../../../../../models/Letter';

@Component({
  selector: 'app-creationlettre',
  standalone: false,
  templateUrl: './creationlettre.component.html',
  styleUrl: './creationlettre.component.css'
})
export class CreationlettreComponent implements OnInit{

  
  cvId: string = '';
  isLoading: boolean = false;
  letter: Letter = { content: '', object: '' };

  constructor(private ngz:NgZone,private letterservice:LetterService,private active:ActivatedRoute,private route:Router) {}
  ngOnInit(): void {
    this.cvId = this.active.snapshot.paramMap.get('id') || '';
  }

  generateWithAI() {
 
    this.isLoading = true;
    this.ngz.run(() => {

      this.letterservice.getLetterByCvId(this.cvId).subscribe(
        {
          next: (data) => {
            this.letter.content = data.content;
            this.letter.object = data.object;
            this.isLoading = false;
          },
          error: (err) => {
            console.error("Error generating letter: ", err);
            this.isLoading = false;
          }
        }
      )
    }
    );
  } 
  saveLetter() {
    this.isLoading = true;
    this.letterservice.saveLetter(this.letter, this.cvId).subscribe({
      next: (data:any) => {
        console.log("Letter saved successfully: ", data);
        this.isLoading = false;
        this.route.navigateByUrl('/candidate/listcvs'); // Navigate to the list of letters after saving
        // Optionally, you can navigate to another page or show a success message
      }
      ,
      error: (err:any) => {
        console.error("Error saving letter: ", err);
        // Optionally, you can show an error message to the user
      }   
    });
    }
}
