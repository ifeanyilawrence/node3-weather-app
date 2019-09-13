const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lawrence'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lawrence'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help me Oh! Lord.',
        title: 'Help',
        name: 'Lawrence'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter the address.'
        });
    }

    const location = req.query.address;

    geocode(location, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        
        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({ error });
            }
    
            res.send({
                location,
                forecast,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found!',
        name: 'Lawrence',
        title: '404'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Lawrence'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});