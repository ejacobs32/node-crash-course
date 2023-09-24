const express = require('express');

// express app
const app = express();

// register veiw engine
app.set('view engine', 'ejs');
app.set('views', 'myviews');

// listen for requests
const webSock = app.listen(3000);

// respond
app.get('/', (req, res) => {

    let blogs = [
    {title: 'Kobolds. Best boys?', snippet: "Kobolds dig! Kobolds STRONG!"},
    {title: 'See ya Later Alligator', snippet: "A large reptile in the Crocodilia order in the genus Alligator of the family Alligatoridae."},
    {title: 'Snec Snec Snec', snippet: "Don't step on the danger noodle!"},
    ];

    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a Bog'});
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404 - Not Found'});
});