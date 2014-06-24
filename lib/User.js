/**
 * External dependencies.
 */

var mongoose = require('mongoose');

/**
 * User schema.
 */

var schema = new mongoose.Schema({
  name: String,
  world: String
});

/**
 * Find all unicorns in given `world`.
 *
 * @param {String} world
 * @param {Function} fn
 * @api public
 * @static
 */

schema.statics.findUnicorns = function(world, fn) {
  this.find({ world: world }, fn)
};

/**
 * Register the model.
 */

var User = mongoose.model('User', schema);

/**
 * Fake request handler.
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */

module.exports = function(req, res, next) {
  User.findUnicorns(req.query.world, next)
};