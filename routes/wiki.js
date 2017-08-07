const express = require('express');
const router = express.Router();

const models = require('../models');
const Page = models.Page;
const User = models.User;

// User functions
router.get('/', function(req, res, next) {
  Page.findAll({})
  .then(function (pageList) {
    res.render('index', {pages: pageList});
  })
  // res.send('got to GET /wiki/');
});

router.post('/', function(req, res, next) {

  // getting our page up in dat dataBASE BOIIIIIIII
  let page = Page.build({
    title: req.body.title,
    content: req.body.content,
    name: req.body.name,
    email: req.body.email
  });

  page.save()
  .then(function(savedPage){
  res.redirect(savedPage.route);
  })
  .catch(next);

  // res.json(req.body);
  // res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
  // res.send('got to GET /wiki/add');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    // res.json(foundPage);
    // res.render('wikipage', {
    //   title: foundPage.title,

    // });
    console.log(foundPage.dataValues)
    res.render('wikipage', foundPage.dataValues);
  })
  .catch(next);
});

// export at the end
module.exports = router;
