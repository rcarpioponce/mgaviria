var Mlocal = require('../models/local.js');
module.exports = Backbone.Collection.extend({
	model: Mlocal,
	url: App.root + '/local'
});