import { RestaurantComponent } from './user-profile/restaurant/restaurant.component';
import { MyBlogsComponent } from './user-profile/my-blogs/my-blogs.component';
import { DetailedBlogComponent } from './user-profile/detailed-blog/detailed-blog.component';
import { EditBlogComponent } from './user-profile/edit-blog/edit-blog.component';
import { NewBlogComponent } from './user-profile/new-blog/new-blog.component';
import { HomeComponent } from './user-profile/home/home.component';

import { Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


import { AuthGuard } from './auth/auth.guard';
import { DetailedRestaurantComponent } from './user-profile/detailed-restaurant/detailed-restaurant.component';

export const appRoutes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'userprofile', component: UserProfileComponent, children: [{ path : '', component: HomeComponent}], canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'home', component: UserProfileComponent, children: [{ path : '', component: HomeComponent}] , canActivate: [AuthGuard]
  },
  {
    path: 'newblog', component: UserProfileComponent, children: [{ path : '', component: NewBlogComponent}] , canActivate: [AuthGuard]
  },
  {
    path: 'editblog', component: UserProfileComponent, children: [{ path : '', component: EditBlogComponent}] , canActivate: [AuthGuard]
  },
  {
    path: 'blogdetails', component: UserProfileComponent, children: [{ path : '', component: DetailedBlogComponent}] , canActivate: [AuthGuard]
  },
  {
    path: 'myblogs', component: UserProfileComponent, children: [{ path : '', component: MyBlogsComponent}] , canActivate: [AuthGuard]
  },
  {
    path: 'restaurants', component: UserProfileComponent, children: [{ path : '', component: RestaurantComponent}] , canActivate: [AuthGuard]
  },
  {
    path: 'restaurant', component: UserProfileComponent, children: [{ path : '', component: DetailedRestaurantComponent}] , canActivate: [AuthGuard]
  },


];


