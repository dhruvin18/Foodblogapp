import { Blog } from './../../shared/blog.model';
import { UserService } from './../../shared/user.service';
import { BlogService } from './../../shared/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  userDetails;
  uploadForm: FormGroup;
  serverUrl = 'http://localhost:3000/single';

  temp: Blog;
  _id : string = "";
  title: string = "";
  subtitle: string = "";
  imageUrl: string = "";
  summary: string = "";
  description: string = "";
  likes_count : Number = 0;

  constructor(private userService: UserService, private blogService: BlogService , private route: ActivatedRoute, private router: Router,private formBuilder: FormBuilder, private httpClient: HttpClient) {
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
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
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
    this.blogService.updateBlog(this._id,this.title,this.subtitle, this.userDetails.fullname, this.userDetails.email, this.summary, this.description, this.likes_count, this.imageUrl).subscribe(
      () => {
        this.router.navigate(['/userprofile'])
      }
    )
  }
  onSubmitImage() {
    const formData = new FormData();
    formData.append('profile', this.uploadForm.get('profile').value);
    console.log('hi');
    console.log(formData);
    this.httpClient.post(this.serverUrl, formData).subscribe(
      (res) => {this.imageUrl = res['filename']; },
      (err) => console.log(err)
    );
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

}
