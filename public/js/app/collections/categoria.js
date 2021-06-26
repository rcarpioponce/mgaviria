var Mcategoria = require('../models/categoria.js');
module.exports = Backbone.Collection.extend({
	model: Mcategoria,
	url: App.root + '/categoria',
	initialize: function(){
		//console.log('pagina a ver ',paginaCurrent);
		this.url = this.url + '?page=' + App.paginaCurrent;
	}
});