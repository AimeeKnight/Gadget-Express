'use strict';

//module.exports = function (name, rating, length, year, studio, actors, director, poster){
module.exports = function (body){
  this.name = body.name || '';
  this.rating = body.rating || '';
  this.length = parseInt(body.length || 0);
  this.year = parseInt(body.year || 0);
  this.studio = body.studio || '';
  this.actors = body.actors ? body.actors.split(', ') : [];
  this.director = body.director || '';
  this.poster = body.poster || '';
};

