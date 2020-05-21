//require('./config/config');
require('./models/db');
require('./config/passportConfig');

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
            blog.likes_count = req.body.likes_count
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

const ctrlUser=require('./controllers/user.controller')
const jwtHelper=require('./config/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);

app.use('/', router)
// const ctrluser=require('./controllers/user.controller');
// app.post('/add/blogs', ctrluser.addBlog); 






