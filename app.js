const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const models = require('./models');
const routes = require('./routes');

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
app.use(express.static(path.join(__dirname, './public')));

app.use(routes);
app.get('/', function(req, res, next){

  res.render('index', );
})
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {message: err.message, error: err});
});

models.db.sync({force: false})  //syncing database all at once
.then(() => {
  app.listen(1337, () => console.log('listening on port 1337'));
})
.catch(console.error);
