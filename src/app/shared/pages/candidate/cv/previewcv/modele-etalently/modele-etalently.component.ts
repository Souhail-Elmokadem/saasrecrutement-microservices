import { Component, OnInit } from '@angular/core';
import { Cv } from '../../../../../../models/Cv';
import { CvserviceService } from '../../../../../../core/services/cv-service/cvservice.service';
import { ActivatedRoute } from '@angular/router';


import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-modele-etalently',
  standalone: false,
  templateUrl: './modele-etalently.component.html',
  styleUrl: './modele-etalently.component.css'
})
export class ModeleEtalentlyComponent implements OnInit {

 cv?:Cv;

 constructor(private cvservice:CvserviceService,private route:ActivatedRoute){
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
  downloadPDF(): void {
    const element = document.getElementById('cv-to-export');
    html2pdf().set({
      margin: 0,
      filename: 'cv-sidebar.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save();
  }
  
}

