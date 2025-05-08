import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../../../core/services/user-service/userservice.service';

@Component({
  selector: 'app-list-users',
  standalone: false,
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent  implements OnInit{

  dataa!:any;
  constructor(private userService: UserserviceService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        console.log("✅ Response from backend", data)
        this.dataa=data;
      },
      error: err => console.error("❌ Error:", err)
    });
  }
}
