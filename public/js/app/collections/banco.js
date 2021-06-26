var Mbanco = require('../models/banco.js');
module.exports = Backbone.Collection.extend({
	model: Mbanco,
	url: App.root + '/banco'
});