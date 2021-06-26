var Mpais = require('../models/pais.js');
module.exports = Backbone.Collection.extend({
	model: Mpais,
	url: App.root + '/pais',
	initialize: function(){
		this.url = this.url ; // + '?page=' + App.paginaCurrent;
	}
});