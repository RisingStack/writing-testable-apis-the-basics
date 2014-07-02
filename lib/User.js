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
 * Colorize unicorns
 *
 * @param {Object} query
 * @param {Function} fn
 */

exports.colorizeUnicorns = function(query, fn) {
  User.findUnicorns(query.world, function (err, unicorns) {
	if(err) {
		return fn(err);
	}

	unicorns = unicorns.map(function (uni, key) {
		uni += key % 2 ? '-purple' : '-pink';
		return uni;
	});

	return fn(null, unicorns);
  });
};
