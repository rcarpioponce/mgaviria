var Mmarca = require('../models/marca.js');
module.exports = Backbone.Collection.extend({
	model: Mmarca,
	url: App.root + '/marca',
	initialize: function(){
		//console.log('pagina a ver ',paginaCurrent);
		this.url = this.url + '?page=' + App.paginaCurrent;
	}
});