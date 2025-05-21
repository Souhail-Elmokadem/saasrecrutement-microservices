import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cv } from '../../../../models/Cv';
import { CvserviceService } from '../../../../core/services/cv-service/cvservice.service';

@Component({
  selector: 'app-list-cvs',
  standalone: false,
  templateUrl: './list-cvs.component.html',
  styleUrl: './list-cvs.component.css'
})
export class ListCvsComponent implements OnInit{
  cvs:Cv[]=[];

  constructor(private route:Router,private cvservice:CvserviceService ){}

  ngOnInit(): void {
    this.getCvs();
  }

  section:Number=1;

  updateSection(number:any){
      this.section=number;
  }


  getCvs(){
    this.cvservice.getCvByUser().subscribe({
      next:(data)=>{
        this.cvs=data;
        console.log(this.cvs)
      },
      error:err=>console.log("failed to : "+err)
    })
  }



GoToCreateCv() {
  this.route.navigateByUrl("/candidate/choixcreationcv")

}

}
