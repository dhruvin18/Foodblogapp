import { UserService } from './../../shared/user.service';
import { BlogService } from './../../shared/blog.service';
import { Blog } from './../../shared/blog.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  userDetails : any;
  blogs : Blog[]
  enabledComments = [];

  constructor(private userService: UserService, private blogService : BlogService, private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    this.fetchSpecificBlogs()
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

  fetchSpecificBlogs() {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp];
        console.log('From service : ',this.userDetails.email)
        console.log('From service : ',this.userDetails.fullname)
        console.log("THis is a test 1");
        this.blogService.getSpecificBlogs(this.userDetails.fullname).subscribe((data: Blog[]) => {
          this.blogs = data;
          console.log('Data Requested...');
          console.log(this.blogs);
        });
      },
      err => {}
    );
  }

  deleteBlog(id: string) {
    if (confirm('Are you sure to delete this blog ?') === true) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.fetchSpecificBlogs();
      });
    }
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current blog post id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }

}