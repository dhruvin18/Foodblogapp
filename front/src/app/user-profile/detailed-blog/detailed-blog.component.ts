import { Blog } from './../../shared/blog.model';
import { BlogService } from './../../shared/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailed-blog',
  templateUrl: './detailed-blog.component.html',
  styleUrls: ['./detailed-blog.component.css']
})
export class DetailedBlogComponent implements OnInit {

  _id: string;
  blog: Blog;
  enabledComments = [];

  constructor(private blogService: BlogService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      console.log(params.blog_id);
      this._id = params.blog_id;

      this.blogService.getIssueById(this._id).subscribe(
        (res) => {
          // console.log(res);
          this.blog = res as Blog;
        }
      );

    });
  }

  ngOnInit(): void {
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
