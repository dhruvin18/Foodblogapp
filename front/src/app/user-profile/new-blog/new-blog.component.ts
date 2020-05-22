import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
import { BlogService } from './../../shared/blog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  userDetails;
  uploadForm: FormGroup;
  serverUrl = 'http://localhost:3000/single';

  title: string = "";
  subtitle: string = "";
  imageUrl: string = "";
  summary: string = "";
  description: string = "";
  constructor(private userService: UserService, private blogService: BlogService, private router: Router,private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp];
      },
      err => {}
    );
  }
  addMeal() {
    this.blogService.addBlog(this.title, this.subtitle, this.userDetails.fullname, this.userDetails.email, this.summary, this.description, 0, this.imageUrl).subscribe( () => {
        this.router.navigate(['/userprofile']);
      }
    );
  }
  onSubmit() {
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
