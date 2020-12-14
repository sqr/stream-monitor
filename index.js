require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const Datastore2 = require('nedb');
const Datastore = require('nedb-promises')
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override')
const moment = require('moment')
const db = require('./other')
const app = express();

const streamings = db.streamings.streamings;
const streamList = db.streamList;


const users = new Datastore({ filename: 'users.db', timestampData: true, autoload: true });

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    username => users.findOne({ username: username }),
    id => users.findOne({ _id: id }));

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'layout'
}));

Handlebars.registerHelper('formatTime', function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
});

app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    streamings.find({}, function (err, docs) {
        res.render('index', { data : docs })
    });
});

app.get('/secret', checkAuthenticated, (req, res) => {
    user_id = req.session.passport.user
    res.render('secret', { name: user_id })
});

app.get('/add', checkAuthenticated, (req, res) => {
    user_id = req.session.passport.user
    streamings.find({}, function (err, docs) {
        res.render('add', { name: user_id, data : docs })
    });
});

app.post('/add', checkAuthenticated, (req, res) => {
    const name = req.body.name
    const stream_url = req.body.stream_url
    const website_url = req.body.website_url
    const created_by = req.session.passport.user
    streamings.insert({'name': name, 'stream_url': stream_url, 'website_url': website_url, 'created_by': created_by});
    streamings.find({}, function (err, docs) {
        res.render('add', { name: user_id, data : docs })
    });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/add',
    failureRedirect: '/login',
    failureFlash: true
}))

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })

/* app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.hbs')
 })

app.post('/register', checkNotAuthenticated, async (req, res) => {
try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
    })
    console.log('users is :' + users)
    res.redirect('/login')
} catch {
    res.redirect('/register')
}
}) */

function checkAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
    return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
    return res.redirect('/')
    }
    next()
}

app.get('/api', (req, res) => {
    var dataToSend = { 'message': 'peine' };
    const streamList = db.streamList;
    var JSONdata = JSON.stringify(streamList);
    res.send(streamList);
});

app.listen(4000, () => console.log('listening at port 4000'));