var Moperario = require('../models/operario.js');
module.exports = Backbone.Collection.extend({
	model: Moperario,
	url: App.root + '/operario',
	initialize: function(){
		this.url = this.url + '?page=' + App.paginaCurrent;
	}
});