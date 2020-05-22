import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
import { BlogService } from './../../shared/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  userDetails;

  title: string = "";
  subtitle: string = "";
  imageUrl: string = "";
  summary: string = "";
  description: string = "";
  constructor(private userService: UserService, private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp];
      },
      err => {}
    );
  }
  addMeal() {
    this.blogService.addBlog(this.title, this.subtitle, this.userDetails.fullname, this.userDetails.email, this.summary, this.description, 0, 0, this.imageUrl).subscribe( () => {
        this.router.navigate(['/userprofile']);
      }
    );
  }

}
