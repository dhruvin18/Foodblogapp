import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  userDetails : any;
  serverErrorMessages: string;
  functionDebug: string;
  functionDebug1: string;
 
  constructor(private userService: UserService, private router: Router) {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp];
      },
      err => {}
    );
   }

  ngOnInit(): void {
    
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }

  
}
