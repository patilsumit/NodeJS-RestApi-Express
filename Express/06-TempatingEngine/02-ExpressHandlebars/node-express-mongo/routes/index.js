var express = require('express');
var router = express.Router();


var {allContent,createContent}  = require('../models/content');
/* GET home page. */
router.get('/', function(req, res, next) {
    allContent.find(function(err, content) {
      res.render('partials/index', { title: 'Handelbars', contents: content });
      console.log(content);

  });
});
/* GET home page. */
router.get('/:id', function(req, res, next) {
  console.log(req.params);
  var id = req.params.id;
  allContent.findById(id, function(err, content) {
    res.render('partials/index_id', { title: 'Hello world', contents: content });
    console.log(content);
});
});


/* NEW user */

router.get('/new/new', function(req, res) {

  res.render('partials/user-new');

});


/* INSERT user */

router.post('/insert_user', function(req, res) {

  console.log("welcome to post");      

var title = req.body.title;
var author = req.body.author;
var description = req.body.description;

console.log('POST VALUES: ' + title + ' ' + author+''+ description);

const contentsObj = {
  title:title,
  author:author,
  description:description
}

createContent(contentsObj)
      .then((result) => {
        res.send(result);
        console.log("created a new content:", result.title);
      })
      .catch((err)=>{
        res.status(500);
        res.send("Error: Unable to create the content\n"+err.message);
        console.log("Error: Unable to create the content\n"+err);
      });
});


module.exports = router;