var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var morgan = require('morgan');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.jpg');
  }
});

var upload = multer({ storage : storage}).single('userPhoto');



//Configure app to use bodyParser() and morgan ;
app.use(bodyParser.urlencoded({ extend: true}));
app.use(bodyParser.json());
app.use(morgan('combined'))
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname,'/public'));





var port = process.env.PORT || 1337;

//Routes for the API
app.use(function(req, res, next) {
  console.log("Got Request"); //
  next();
})

app.post('/run', function(req, res) {
  // res.json({message: "API server Run!"});
  console.log(req.body)
  console.log(req.files)

});


app.get('/info', function(req,res){
  res.sendfile(__dirname + '/index.html')

});

app.post('/upload',function(req,res){
  upload(req,res,function(err) {
    if(err) {
      return res.end("Erreur chargement .");
    }
    res.end("Fichier disponible sur le serveur");
  });
});


app.get('/image', function(req,res){
  fs.realpath(__dirname +"/images", function(err, path) {
    if (err) {
        console.log(err);
     return;
    }
    console.log('Path is : ' + path);
});

fs.readdir(__dirname +"/images", function(err, files) {
    if (err) return;





var results = [];


  files.forEach(function(file, index){
      results[index] = 'images/' + file;
  });

  res.json(results);


  });

})




//api prefixed rpooute 


//Start the server
app.listen(port);
console.log('API server has been started on port ' + port);