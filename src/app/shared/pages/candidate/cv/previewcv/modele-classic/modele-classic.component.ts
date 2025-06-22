import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CvserviceService } from '../../../../../../core/services/cv-service/cvservice.service';
import { Cv } from '../../../../../../models/Cv';
import { ActivatedRoute } from '@angular/router';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-modele-classic',
  standalone: false,
  templateUrl: './modele-classic.component.html',
  styleUrl: './modele-classic.component.css'
})
export class ModeleClassicComponent implements OnInit{
  cv?:Cv;
  
  constructor(private cvservice:CvserviceService,private route:ActivatedRoute){
  }

  @ViewChild('cvContent', { static: false }) cvContent!: ElementRef;

 
downloadPDF(): void {
  const element = document.getElementById('cv-to-export') as HTMLElement;

  html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollY: -window.scrollY,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;

    const imgProps = {
      width: pageWidth,
      height: (canvas.height * pageWidth) / canvas.width,
    };

    // Adjust if height exceeds 1 page (force scale to fit)
    if (imgProps.height > pageHeight) {
      imgProps.height = pageHeight;
    }

    pdf.addImage(imgData, 'JPEG', 0, 0, imgProps.width, imgProps.height);
    pdf.save('cv.pdf');
  });
}
 
  ngOnInit(): void {

    this.cvservice.getCvById(this.route.snapshot.paramMap.get('id')!).subscribe({
      next:(data)=>{
        console.log("success")
          this.cv=data;
      },
      error:err=>console.log(err)
    })
  }

}
