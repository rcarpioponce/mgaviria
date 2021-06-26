var Munidad = require('../models/unidad.js');
module.exports = Backbone.Collection.extend({
	model: Munidad,
	url: App.root + '/unidad'
});