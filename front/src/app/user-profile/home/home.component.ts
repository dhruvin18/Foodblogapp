import { UserService } from './../../shared/user.service';
import { BlogService } from './../../shared/blog.service';
import { Blog } from './../../shared/blog.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails;
  currentblog : Blog
  blogs : Blog[]

  constructor(private userService: UserService, private blogService : BlogService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp]
        console.log("INside onInit",this.userDetails)
      },
      err => {}
    );
    console.log("Outside onInit",this.userDetails)
    this.fetchBlogs()
  }

  displayMore(id: string) {
    console.log(id);
    const navigationExtras: NavigationExtras = {
      queryParams: {
          blog_id: id
        }
    };
    this.router.navigate(['blogdetails'], navigationExtras);
  }

  editBlog(id: string) {
    console.log(id);
    const navigationExtras: NavigationExtras = {
      queryParams: {
          blog_id: id
        }
    };
    this.router.navigate(['editblog'], navigationExtras);
  }

  fetchBlogs() {
    this.blogService.getAllBlogs().subscribe((data: Blog[]) => {
      this.blogs = data;
      console.log('Data Requested...');
      console.log(this.blogs);
    });
  }

  deleteBlog(id: string) {
    if (confirm('Are you sure to delete this blog ?') === true) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.fetchBlogs();
      });
    }
  }

  likeBlog(id:string) {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp]
        this.blogService.getIssueById(id).subscribe(
          (res) => {
            console.log(res);
            this.currentblog = res as Blog;
          }
        );
        this.blogService.likeBlog(id, this.userDetails.fullname).subscribe(()=>{
          this.fetchBlogs();
        })
      },
      err => {}
    );
  }

  dislikeBlog(id:string) {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp]
        this.blogService.getIssueById(id).subscribe(
          (res) => {
            console.log(res);
            this.currentblog = res as Blog;
          }
        );
        this.blogService.dislikeBlog(id, this.userDetails.fullname).subscribe(()=>{
          this.fetchBlogs();
        })
      },
      err => {}
    );
  }

}
