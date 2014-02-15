'use strict';

module.exports = function(user){
  this.name = user.name || '';
  this.balence = parseInt(user.balence || 0);
  this.purchases = user.purchases ? user.purchases.split('  ') : [];
};
