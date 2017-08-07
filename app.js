const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const models = require('./models');

const app = express();

//rendering with nunjucks
const env = nunjucks.configure('views', {noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//logging out requests
app.use(morgan('dev'));

//parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//linking static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res, next){
  res.render('index');
})

models.db.sync({})  //syncing database all at once
.then(() => {
  app.listen(1337, () => console.log('listening on port 1337'));
})
.catch(console.error);
