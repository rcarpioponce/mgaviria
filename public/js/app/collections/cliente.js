var Mcliente = require('../models/cliente.js');
module.exports = Backbone.Collection.extend({
	model: Mcliente,
	url: App.root + '/cliente',
	initialize: function(){
		this.url = this.url + '?page=' + App.paginaCurrent;
	}
});