// create web server with express
const express = require('express');
const app = express();
// create a port
const port = 3000;
// create a path
const path = require('path');
// create a body parser
const bodyParser = require('body-parser');
// create a mongoose
const mongoose = require('mongoose');
// create a method override
const methodOverride = require('method-override');
// create a express-sanitizer
const expressSanitizer = require('express-sanitizer');

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
// set the view engine
app.set('view engine', 'ejs');
// set the path
app.set('views', path.join(__dirname, 'views'));
// set the body parser
app.use(bodyParser.urlencoded({ extended: true }));
// set the express sanitizer
app.use(expressSanitizer());
// set the method override
app.use(methodOverride('_method'));
// set the path for public
app.use(express.static(path.join(__dirname, 'public')));

// create a schema
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});
// create a model
const Blog = mongoose.model('Blog', blogSchema);

// RESTful Routes
// Blog.create({
//   title: 'Test Blog',
//   image:
//     'https://images.unsplash.com/photo-1562967914-527ecf2aeeb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//   body: 'Hello this is a blog post',
// });

// RESTful Routes
// Index Route
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// Index Route
app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log('ERROR!');
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

// New Route
app.get('/blogs/new', (req, res) => {
  res.render('new');
});

// Create Route
app.post('/blogs', (req, res) => {
  // create blog
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      console.log('ERROR!');
    } else {
      // redirect to the index
      res.redirect('/blogs');
    }
  });
});

// Show Route
app.get('/blogs/:id', (req, res) => {
Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
        res.redirect('/blogs');
    } else {
        res.render('show', { blog: foundBlog });
    }
});

});
