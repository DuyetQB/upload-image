var mongo = require('mongodb');
var fs = require('fs');
var http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.Host || 4000;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learn-nodejs';
var formidable = require('formidable');

// MongoClient.connect(url, function (err, db) {
//   var dbo = db.db('mydb');
//   var updateValue = {address: 'trung hoa qb'};
//   var query = {$set: {address: 'hoa son minh hoa'}};
//   var id = {};
//   dbo.collection('customers2').findOne({}, function (err, res) {
//     if (err) throw err;
//     console.log('res!', res);
//     db.close();
//   });
// });

// app.get('/', (req, res, next) => {
//   if (req.url == '/fileupload') {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       var oldpath = files.filetoupload.path;
//       var newpath = 'C:/Users/Dinh/' + files.filetoupload.name;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//       });
//     });
//   }
//   return res.sendFile(__dirname + '/index.html');
// });

http
  .createServer(function (req, res) {
    if (req.url == '/fileupload') {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;

        var newpath =
          'C:/Users/Dinhs' + '/fileupload' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.write('<div>');
          res.write(`<img src="${newpath}"/>`);
          res.write(`<img src='${newpath}'/>`);
          res.write('</div>');
          res.end();
        });
      });
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write('</form>');
      return res.end();
    }
  })
  .listen(PORT);

// app.listen(PORT, (req, res, next) => {
//   console.log(`the server is runing on port ${PORT}`);
// });
