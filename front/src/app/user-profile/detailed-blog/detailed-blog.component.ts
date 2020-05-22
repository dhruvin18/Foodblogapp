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
}
