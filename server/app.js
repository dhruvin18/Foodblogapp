//require('./config/config');
require('./models/db');
require('./config/passportConfig');

const mongoose = require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
//const Monkeylearn=require('monkeylearn');

const app=express()

//middleware
app.use(bodyParser.json())
app.use(cors());
app.use(passport.initialize());

app.post('/check',function(req,res){
    res.json(req.body);
});

//start server
app.listen(3000, () => console.log('Server at Port: 3000'));

//error handler
app.use((err,req,res,next)=>{
    if(err.name == 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

const Blog = require('./models/Blog.model')
const router = express.Router()

// Get all blogs
router.route('/blogs').get((req, res) => {
    Blog.find((err, blogs) => {
        if (err)
            console.log(err)
        else 
            res.json(blogs)
    })
})

// Get all blogs for a specific user
// user fullname to be provided in request body
router.route('/blogs/myBlogs').post((req,res) => {
    Blog.find({fullname : req.body.fullname },(err,blogs) => {
        if (err)
            console.log(err)
        else 
            res.json(blogs)
    })
})

// Get most recent blog
router.route('/home').get((req, res) => {
    Blog.find((err, blog) => {
        if (err)
            console.log(err)
        else 
            res.json(blog)
    }).limit(1)
})

// Get Blog by ID
router.route('/blogs/:id').get((req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err)
            console.log(err)
        else
            res.json(blog)
    })
})

// Post new blog 
router.route('/blogs/add').post((req, res) => {
    console.log('Add a blog');
    let blog = new Blog(req.body)
    blog.save()
        .then(blog => {
            res.status(200).json({'blog': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('Failed to create new blog')
        })
})

// Update existing blog
router.route('/blogs/update/:id').post((req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (!blog)
            return next(new Error('Could not load Document'))
        else {
            blog.title = req.body.title
            blog.subtitle = req.body.subtitle
            blog.fullname = req.body.fullname
            blog.email = req.body.email
            blog.summary = req.body.summary
            blog.description = req.body.description
            blog.likedBy = req.body.likedBy
            blog.dislikedBy = req.body.dislikedBy
            blog.likes = req.body.likes
            blog.dislikes = req.body.dislikes
            blog.image_url = req.body.image_url
            blog.timestamp = req.body.timestamp

            blog.save().then(blog => {
                res.json('Update done')
            }).catch(err => {
                res.status(400).send('Update failed')
            });
        }
    });
});

// Delete blog
router.route('/blogs/delete/:id').get((req, res) => {
    Blog.findByIdAndRemove({_id: req.params.id}, (err, blog) => {
        if (err)
            res.json(err)
        else 
            res.json('Removed Successfully')
    })
})

//Like a blog
router.route('/blogs/like/:id').put((req,res)=>{
    Blog.findById(req.params.id,(err,blog)=>{
        if (!blog)
            return next(new Error('Could not load Document'))
        else {
            console.log("FOUND BlOG");
            console.log(blog);
            if(blog.likedBy.includes(req.body.fullname)){
                res.json({ success: false, message: 'You already liked this post.' }); // Return error message
            }
            else{
                // Check if user who liked post has previously disliked a post
                if (blog.dislikedBy.includes(req.body.fullname)) {
                    blog.dislikes--; // Reduce the total number of dislikes
                    const arrayIndex = blog.dislikedBy.indexOf(req.body.fullname); // Get the index of the username in the array for removal
                    blog.dislikedBy.splice(arrayIndex, 1); // Remove user from array
                    blog.likes++; // Increment likes
                    blog.likedBy.push(req.body.fullname); // Add username to the array of likedBy array
                    // Save blog post data
                    blog.save((err) => {
                      // Check if error was found
                      if (err) {
                        res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Blog liked!' }); // Return success message
                      }
                    });
                } else {
                    blog.likes++; // Increment likes
                    blog.likedBy.push(req.body.fullname); // Add liker's username into array of likedBy
                    // Save blog post
                    blog.save((err) => {
                      if (err) {
                        res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                      } else {
                        res.json({ success: true, message: 'Blog liked!' }); // Return success message
                      }
                    });
                }
            }
        }
    })
})

//Dislike a blog
router.route('/blogs/dislike/:id').put((req,res)=>{
    Blog.findById(req.params.id,(err,blog)=>{
        if(!blog){
            return next(new Error('Could not load Document'))
        }else{
            console.log("FOUND BlOG");
            console.log(blog);
            // Check if user who disliked post has already disliked it before
            if (blog.dislikedBy.includes(req.body.fullname)) {
                res.json({ success: false, message: 'You already disliked this post.' }); // Return error message
            } else {
                // Check if user has previous disliked this post
                if (blog.likedBy.includes(req.body.fullname)) {
                  blog.likes--; // Decrease likes by one
                  const arrayIndex = blog.likedBy.indexOf(req.body.fullname); // Check where username is inside of the array
                  blog.likedBy.splice(arrayIndex, 1); // Remove username from index
                  blog.dislikes++; // Increase dislikeds by one
                  blog.dislikedBy.push(req.body.fullname); // Add username to list of dislikers
                  // Save blog data
                  blog.save((err) => {
                    // Check if error was found
                    if (err) {
                      res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                    } else {
                      res.json({ success: true, message: 'Blog disliked!' }); // Return success message
                    }
                  });
                } else {
                  blog.dislikes++; // Increase likes by one
                  blog.dislikedBy.push(req.body.fullname); // Add username to list of likers
                  // Save blog data
                  blog.save((err) => {
                    // Check if error was found
                    if (err) {
                      res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                    } else {
                      res.json({ success: true, message: 'Blog disliked!' }); // Return success message
                    }
                  });
                }
            }
        }
    })
})

const ctrlUser=require('./controllers/user.controller')
const jwtHelper=require('./config/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);

app.use('/', router)
// const ctrluser=require('./controllers/user.controller');
// app.post('/add/blogs', ctrluser.addBlog); 

// for making api call to fetch data from zomato api
require('./models/restaurant.model');
const Restaurant=mongoose.model('Restaurant');

router.route('/restaurants').get((req, res) => {
    Restaurant.find((err, restaurants) => {
        if (err)
            console.log(err);
        else 
            res.json(restaurants);
    });
});
var header= {
    'user-key':"dcafb6b0b53785d24b5398b33c9a3475"
};
var data;
const request=require('request');
app.get('/makeApiCall', (req,res)=> {
    request( {'headers': header,'url': 'https://developers.zomato.com/api/v2.1/search?entity_id=3&entity_type=city', json: true}, (err,res,body) => {
    if(err){
        console.log(err);
    }
    else{
        data=body['restaurants'];
        console.log(data);
        for(i=0; i<20;i++){
            restaurant=data[i]['restaurant'];
            var resto=new Restaurant();
            resto._id= restaurant['id'],
            resto.name= restaurant['name'],
            resto.cuisines= restaurant['cuisines'],
            resto.address= restaurant['location']['address'],
            resto.timings= restaurant['timings'],
            resto.costfortwo= restaurant['average_cost_for_two'], 
            resto.locality= restaurant['location']['locality_verbose'],
            resto.url= restaurant['url'],
            resto.highlights= restaurant['highlights'],
            resto.image= restaurant['thumb'],
            resto.phoneNumbers= restaurant['phone_numbers'],
            resto.rating = restaurant['user_rating']['aggregate_rating'],
            resto.establishment= restaurant['establishment']
            resto.save((err,doc)=>{
                if(!err){
                    if(i==19){
                        res.redirect('success');
                    }
                }
                else{
                    console.log(err)
                }
            });
        }
    }
    });
});