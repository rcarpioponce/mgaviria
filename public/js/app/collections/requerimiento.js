var Mrequerimiento = require('../models/requerimiento.js');
module.exports = Backbone.Collection.extend({
	model: Mrequerimiento,
	url: App.root + '/requerimiento',
	initialize: function(){
		this.url = this.url + '?page=' + App.paginaCurrent;
	}
});