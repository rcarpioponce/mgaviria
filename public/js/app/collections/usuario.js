var Musuario = require('../models/usuario.js');
module.exports = Backbone.Collection.extend({
	model: Musuario,
	url: App.root + '/usuario'
});