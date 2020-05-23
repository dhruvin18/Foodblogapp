import { UserService } from './../../shared/user.service';
import { BlogService } from './../../shared/blog.service';
import { Blog } from './../../shared/blog.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails;
  currentblog: Blog;
  blogs: Blog[];
  newComment = [];
  commentForm;
  processing = false;
  enabledComments = [];

  constructor(private userService: UserService, private blogService: BlogService, private router: Router,private formBuilder: FormBuilder) {
    this.createCommentForm();
   }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp]
        console.log("INside onInit",this.userDetails)
      },
      err => {}
    );
    console.log("Outside onInit",this.userDetails)
    this.fetchBlogs()
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

  likeBlog(id:string) {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp]
        this.blogService.getIssueById(id).subscribe(
          (res) => {
            console.log(res);
            this.currentblog = res as Blog;
          }
        );
        this.blogService.likeBlog(id, this.userDetails.fullname).subscribe(()=>{
          this.fetchBlogs();
        })
      },
      err => {}
    );
  }

  dislikeBlog(id:string) {
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp]
        this.blogService.getIssueById(id).subscribe(
          (res) => {
            console.log(res);
            this.currentblog = res as Blog;
          }
        );
        this.blogService.dislikeBlog(id, this.userDetails.fullname).subscribe(()=>{
          this.fetchBlogs();
        })
      },
      err => {}
    );
  }

  draftComment(id:string) {
    this.commentForm.reset();
    this.newComment = []; // Clear array so only one post can be commented on at a time
    this.newComment.push(id); // Add the post that is being commented on to the array
  }

  // Function to cancel new post transaction
  cancelSubmission(id) {
    const index = this.newComment.indexOf(id); // Check the index of the blog post in the array
    this.newComment.splice(index, 1); // Remove the id from the array to cancel post submission
    this.commentForm.reset(); // Reset  the form after cancellation
    this.enableCommentForm(); // Enable the form after cancellation
    this.processing = false; // Enable any buttons that were locked
  }

  // Create form for posting comments
  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])]
    })
  }

  // Enable the comment form
  enableCommentForm() {
    this.commentForm.get('comment').enable(); // Enable comment field
  }

  // Disable the comment form
  disableCommentForm() {
    this.commentForm.get('comment').disable(); // Disable comment field
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

  postComment(id) {
    this.disableCommentForm(); // Disable form while saving comment to database
    this.processing = true; // Lock buttons while saving comment to database
    const comment = this.commentForm.get('comment').value; // Get the comment value to pass to service function

    // Function to save the comment to the database
    this.userService.getUserProfile().subscribe(
      res => {
        const temp = 'user';
        this.userDetails = res[temp]
        
        this.blogService.postComment(id, this.userDetails.fullname, comment).subscribe(data =>{
          this.fetchBlogs();
          const index = this.newComment.indexOf(id); // Get the index of the blog id to remove from array
          this.newComment.splice(index, 1); // Remove id from the array
          this.enableCommentForm(); // Re-enable the form
          this.commentForm.reset(); // Reset the comment form
          this.processing = false; // Unlock buttons on comment form
          if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
        })
      },
      err => {}
    );
  }
}
