import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { formatDate } from '../../../node_modules/@angular/common';
import { Blog } from './../shared/blog.model';
import { NavigationExtras } from '@angular/router';
import { BlogService } from '../shared/blog.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  serverErrorMessages: string;
  functionDebug: string;
  functionDebug1: string;
  blogs: Blog[];
  constructor(private userService: UserService, private router: Router, private blogService: BlogService) { }

  model = {
    data: '',
  };

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp];
      },
      err => {}
    );
    this.fetchBlogs();
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
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
}
