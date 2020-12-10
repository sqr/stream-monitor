require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const Datastore = require('nedb');
const handlebars = require('express-handlebars');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');


const initializePassport = require('./passport-config');
initializePassport(
    passport,
    username => users.find(user => user.username === username)
)

const app = express();

const streamings = new Datastore({ filename: 'streamings.db', timestampData: true, autoload: true }); 
const users = new Datastore({ filename: 'users.db', timestampData: true, autoload: true });

users.ensureIndex({ fieldName: 'username', unique: true }, function (err) {
    // If there was an error, err is not null
  });

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'layout'
}));
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.listen(4000, () => console.log('listening at port 4000'));
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/secret', (req, res) => {
    res.render('secret')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))