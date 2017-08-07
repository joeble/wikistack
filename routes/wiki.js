const express = require('express');
const router = express.Router();

const models = require('../models');
const Page = models.Page;
const User = models.User;

// User functions
router.get('/', function(req, res, next) {
  res.redirect('/');
  // res.send('got to GET /wiki/');
});

router.post('/', function(req, res, next) {

  // getting our page up in dat dataBASE BOIIIIIIII
  let page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save()
  .then(function(){ res.redirect('/') })
  .catch(next);

  // res.json(req.body);
  // res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
  // res.send('got to GET /wiki/add');
});

// export at the end
module.exports = router;
