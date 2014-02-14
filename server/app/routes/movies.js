'use strict';

var Movie = require('../models/movie');
var mongodb = require('mongodb');

// ---------- CREATE ----------//
exports.create = function(req, res){
  var db       = req.app.locals.db;
  var movies   = db.collection('movies');
  var movie;

  movie = new Movie(req.body);

  movies.insert(movie, function(err, records){
    res.send(records[0]);
  });
};

// ---------- READ ----------//
exports.index = function(req, res){
  var db       = req.app.locals.db;

  db.collection('movies').find().toArray(function(err, movies){
    res.send({movies:movies});
  });
};

// ---------- READ ----------//
exports.query = function(req, res){
  console.log(req.query);
  var db = req.app.locals.db;

  db.collection('movies').find(req.query).toArray(function(err, movies){
    res.send({movies:movies});
  });
};

// ---------- UPDATE ----------//
exports.update = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');

  var body = new Movie(req.body);
  var id = new mongodb.ObjectID(req.params.id);
  var query = {_id : id};

  movies.update(query, body, function(err, count) {
    res.send({updated:count});
  });
};

// ---------- DESTROY ----------//
exports.destroy = function(req, res){
  var db = req.app.locals.db;
  var id = new mongodb.ObjectID(req.params.id);
  var movies = db.collection('movies');
  var query = {_id : id};

  movies.remove(query, function(err, count){
    res.send({deleted:count, id:req.params.id});
  });
};

