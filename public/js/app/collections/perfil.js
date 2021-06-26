var Mperfil = require('../models/perfil.js');
module.exports = Backbone.Collection.extend({
	model: Mperfil,
	url: App.root + '/perfil',
	initialize: function(){
		this.url = this.url ;
	}
});