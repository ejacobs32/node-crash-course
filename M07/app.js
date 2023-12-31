const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

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
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404 - Not Found'});
});