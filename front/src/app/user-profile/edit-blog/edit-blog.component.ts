import { Blog } from './../../shared/blog.model';
import { UserService } from './../../shared/user.service';
import { BlogService } from './../../shared/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  userDetails;

  temp: Blog;
  _id : string = "";
  title: string = "";
  subtitle: string = "";
  imageUrl: string = "";
  summary: string = "";
  description: string = "";
  likes : Number ;
  dislikes : Number ;
  likedBy : Array<string>;
  dislikedBy : Array<string>;

  constructor(private userService: UserService, private blogService: BlogService , private route: ActivatedRoute, private router: Router) {
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
        this.likes = this.temp.likes;
        this.likedBy = this.temp.likedBy;
        this.dislikedBy = this.temp.dislikedBy;
        this.dislikes = this.temp.dislikes;
        this.summary = this.temp.summary;
        this.imageUrl = this.temp.image_url;
      }
    );
   }


  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp]
      },
      err => {}
    );
    console.log(this.userDetails)
  }
  onSubmit(){
    console.log("THIs is test ", this.title);
    this.blogService.updateBlog(this._id,this.title,this.subtitle, this.userDetails.fullname, this.userDetails.email, this.summary, this.description, this.likedBy, this.likes, this.dislikedBy, this.dislikes, this.imageUrl).subscribe(
      () => {
        this.router.navigate(['/userprofile'])
      }
    )
  }

}
