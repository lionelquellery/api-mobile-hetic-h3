var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var morgan = require('morgan')


//Configure app to use bodyParser() and morgan ;
app.use(bodyParser.urlencoded({ extend: true}));
app.use(bodyParser.json());
app.use(morgan('combined'))


var port = process.env.PORT || 1337;

//Routes for the API
app.use(function(req, res, next) {
	console.log("Got Request"); //
	next();
})

app.get('/run', function(req, res) {
	res.json({message: "API server Run!"});

});


app.get('/info', function(req,res){
  res.json({work:"lol"})
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



// ----------------------------------------

// files.forEach(function(f) {
//         console.log('fichiers: ' + f);

//         fs.realpath(__dirname +"/images", function(err, path) {
//     if (err) {
//         console.log(err);
//      return;
//     }
//     // console.log('Path is : ' + path);
//       res.json({url: path + "/" +f});
//     });
          

//     });


// function async(arg, callback) {
//   console.log('document qui provient de cousin \''+arg+'\', Done');
//   res.send({arg});
//   setTimeout(function() { callback(arg * 2); }, 1000);
// }

// function final() { console.log('Done', results); }

var results = {};

// files.forEach(function(item) {
//   async(item, function(result){
//     results.push(result);
//     if(results.length == files.length) {
//       final();
//     }
//   })
// });

files.forEach(function(file, index){
    results['image-' + index] = fs.realpathSync('images/' + file);
});

res.json(results);









// -----------------------------------

  // for(i in files){
  //   f = JSON.stringify(files[i]);
  //   res.json({f});

  //   console.log(f);

  // }


});

})




//api prefixed rpooute 


//Start the server
app.listen(port);
console.log('API server has been started on port ' + port);