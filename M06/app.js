const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://Enoch:8vJhfvAJnFvgygju@nodetuts.6pkskvs.mongodb.net/'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {const webSock = app.listen(3000)    
        console.log('connected to db')})
    .catch((err) => console.log(err));

// register veiw engine
app.set('view engine', 'ejs');
app.set('views', 'myviews');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
});


app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a Bog'});
});

app.post('/blogs', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => { 
            res.render('details', {blog: result, title: 'Blog Details'})
        })
        .catch(err => {
            console.log(err);
        })
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
        .then(result => { 
            res.json({redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err);
        })
});



// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404 - Not Found'});
});