const express = require('express');
var multer  = require('multer');
var fs  = require('fs');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => {
  res.redirect('/users/login');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      var dir = './uploads';
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      callback(null, dir);
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname + '.bak');
  }
});
var upload = multer({storage: storage}).array('files', 12);
router.post('/upload', function (req, res, next) {
  upload(req, res, function (err) {
      if (err) {
          return res.end("Something went wrong:(");
      }
      res.end("Upload completed.");
  });
})

module.exports = router;
