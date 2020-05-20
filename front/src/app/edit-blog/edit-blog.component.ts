import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blog.service';
import { Blog } from '../shared/blog.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  temp: Blog;
  _id : string = "";
  title: string = "";
  subtitle: string = "";
  imageUrl: string = "";
  summary: string = "";
  description: string = "";
  likes_count : Number = 0;

  constructor(private blogService: BlogService , private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      console.log(params.blog_id);
      this._id = params.blog_id;
    });

    this.blogService.getIssueById(this._id).subscribe(
      (res) => {
        // console.log(res);
        this.temp = res as Blog;
        this.title = this.temp.title;
        this.subtitle = this.temp.subtitle;
        this.description = this.temp.description;
        this.summary = this.temp.summary;
        this.imageUrl = this.temp.image_url;
      }
    );
   }


  ngOnInit(): void {
  }
  onSubmit(){
    console.log("THIs is test ", this.title);
    this.blogService.updateBlog(this._id,this.title,this.subtitle, this.summary, this.description, this.likes_count, this.imageUrl).subscribe(
      () => {
        this.router.navigate(['/userprofile'])
      }
    )
  }

}
