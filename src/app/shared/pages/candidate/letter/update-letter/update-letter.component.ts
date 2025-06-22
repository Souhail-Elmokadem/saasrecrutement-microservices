import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { LetterService } from '../../../../../core/services/letter-service/letter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Letter } from '../../../../../models/Letter';

@Component({
  selector: 'app-update-letter',
  standalone: false,
  templateUrl: './update-letter.component.html',
  styleUrl: './update-letter.component.css'
})
export class UpdateLetterComponent {

  cvId: string = '';
  letterId: string = '';
  isLoading: boolean = false;
  letter: Letter = { content: '', object: '' };

  constructor(private ngz:NgZone,private letterservice:LetterService,private active:ActivatedRoute,private route:Router) {}
  ngOnInit(): void {
    this.cvId = this.active.snapshot.paramMap.get('cvid') || '';
    this.letterId = this.active.snapshot.paramMap.get('letterid') || '';
    this.getLetter();
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

  getLetter() {
    this.isLoading = true;
    this.letterservice.getLetterById(this.letterId).subscribe({
      next: (data:any) => {
        this.letter = data;
        this.isLoading = false;
      },
      error: (err:any) => {
        console.error("Error fetching letter: ", err);
        this.isLoading = false;
      }
    });
  }
  updateLetter() {
    this.isLoading = true;
    this.letterservice.updateLetter(this.letter, this.cvId,this.letterId).subscribe({
      next: (data:any) => {
        console.log("Letter updated successfully: ", data);
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
