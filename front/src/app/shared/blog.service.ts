import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  temp;
  readonly baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient, private userService: UserService) { }


  getAllBlogs() {
    return this.http.get(this.baseURL + '/blogs');
  }

  getSpecificBlogs(fullname : string) {
    this.temp = {
      fullname : fullname
    };
    return this.http.post(this.baseURL + '/blogs/myBlogs', this.temp);
  }

  getIssueById(id: string) {
    return this.http.get(this.baseURL + '/blogs/' + id);
  }

  addBlog(title: string, subtitle: string, fullname: string, email:string, summary: string, description: string, likes_count: Number, image_url: string) {

    const blog = {
      title : title,
      subtitle : subtitle,
      fullname : fullname,
      email : email,
      summary : summary,
      description : description,
      likes_count : likes_count,
      timestamp : Date.now(),
      image_url : image_url
    }

    return this.http.post(this.baseURL + '/blogs/add', blog)
  }

  updateBlog(id: string, title: string, subtitle: string,fullname:string, email:string, summary: string, description: string, likes_count: Number, image_url: string) {

    const blog = {
      title : title,
      subtitle : subtitle,
      fullname : fullname,
      email : email,
      summary : summary,
      description : description,
      likes_count : likes_count,
      timestamp : Date.now(),
      image_url : image_url
    }
    const url = this.baseURL + '/blogs/update/' + id;
    return this.http.post(url, blog);
  }

  deleteBlog(id: string) {
    const url = this.baseURL + '/blogs/delete/' + id;
    return this.http.get(url);
  }
}
