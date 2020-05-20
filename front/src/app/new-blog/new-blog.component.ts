import { Component, OnInit } from '@angular/core';
import { BlogService } from './../shared/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  title: string = "";
  subtitle: string = "";
  imageUrl: string = "";
  summary: string = "";
  description: string = "";
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
  }
  addMeal() {
    this.blogService.addBlog(this.title, this.subtitle, this.summary, this.description, 0, this.imageUrl).subscribe( () => {
        this.router.navigate(['/userprofile']);
      }
    );
  }

}
