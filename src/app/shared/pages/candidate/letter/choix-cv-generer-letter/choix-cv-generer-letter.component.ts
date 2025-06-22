import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CvserviceService } from '../../../../../core/services/cv-service/cvservice.service';
import { Cv } from '../../../../../models/Cv';

@Component({
  selector: 'app-choix-cv-generer-letter',
  standalone: false,
  templateUrl: './choix-cv-generer-letter.component.html',
  styleUrl: './choix-cv-generer-letter.component.css'
})
export class ChoixCvGenererLetterComponent  implements OnInit {
  cvList: Cv[] = [];

  constructor(private cvService: CvserviceService, private router: Router) {}

  ngOnInit() {
    this.cvService.getCvByUser().subscribe((data:any) => {
      this.cvList = data.items;
    });
  }

  selectCv(cv: any) {
    this.router.navigateByUrl('/candidate/letter/create/' + cv.id);
  }
}
