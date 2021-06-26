var Mproducto = require('../models/producto.js');
module.exports = Backbone.Collection.extend({
	model: Mproducto,
	url: App.root + '/producto',
	initialize: function(){
		//console.log('pagina a ver ',paginaCurrent);
		this.url = this.url + '?page=' + App.paginaCurrent;
	}
});