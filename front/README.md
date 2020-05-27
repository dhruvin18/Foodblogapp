# Food blogging website 
### using MEAN stack 
___

Following is a quick guide to use this MEAN stack application

### To start the server
```
cd server
node app.js
```

### To launch the website
```
cd front
ng serve --open
```
___

### Sign-up and Sign-in Page

![SignUp](https://github.com/dhruvin18/Foodblogapp/blob/master/GIFS/SignUp.gif "SignUp")

![SignIn](https://github.com/dhruvin18/Foodblogapp/blob/master/GIFS/SignIn.gif "SignIn")

The Sign up and Sign in Page support form validation as shown.After successful login the user is directed to Home page

### Home Page
![Home](https://github.com/dhruvin18/Foodblogapp/blob/master/GIFS/HomePage.gif "Home" )

The Home contains the list of blogs from all the users of the application displayed in the form of cards.

The left side of the home page contains a Zomato widget displaying the restaurants near your location

#### Like, Dislike and Comment button
Each blog has a **Like** and **Dislike** button. User can either like a blog or dislike a button at a time and not both

Each blog also has a **Post Comment** button. User can type a comment and click on submit button to post it.
There is Show comments/Hide comments button to toggle between the views

![Like](https://github.com/dhruvin18/Foodblogapp/blob/master/GIFS/LikesAndComment.gif "Likes,Comment")

### New Blog Tab
![NewBlog](https://github.com/dhruvin18/Foodblogapp/blob/master/GIFS/NewBlog.gif "New Blog")

Here the user can fill the details related to the blog along with an image to be displayed and submit the form 
The information is stored in MongoDB 

### My Blogs Tab
![MyBlog](https://github.com/dhruvin18/Foodblogapp/blob/master/GIFS/MyBlogs.gif "My Blogs")

The list of blogs written by the currently signed-in user are displayed here
There are special privileges here such as **Edit button** and **Delete button**

![Edit](https://github.com/dhruvin18/Foodblogapp/blob/master/GIFS/EditBlog.gif "Edit BLog")

![Delete](https://github.com/dhruvin18/Foodblogapp/blob/master/GIFS/DeleteBlog.gif "Delete Blog")

### Restaurants Tab

This tab display list of different restaurants near you. Clicking on any card will show more details about it.

There is **Search bar** provided to search for restaurants related to a particular food item.

![Restaurants](https://github.com/dhruvin18/Foodblogapp/blob/master/GIFS/restaurants.gif "Restaurants")
