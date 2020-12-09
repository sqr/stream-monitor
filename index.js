const express = require('express');
const Datastore = require('nedb');
const handlebars = require('express-handlebars');

const app = express();

const streamings = new Datastore({ filename: 'streamings.db', timestampData: true, autoload: true }); 
const users = new Datastore({ filename: 'users.db', timestampData: true, autoload: true });

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'layout'
}));

app.listen(4000, () => console.log('listening at port 4000'));
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.render('index');
});