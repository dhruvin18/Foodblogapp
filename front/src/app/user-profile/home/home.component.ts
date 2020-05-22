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

  blogs: Blog[]

  constructor(private blogService: BlogService, private router: Router) {
    this.fetchBlogs();
  }

  ngOnInit(): void {
    this.fetchBlogs();
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
