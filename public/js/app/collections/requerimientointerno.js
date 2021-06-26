var Mrequerimientointerno = require('../models/requerimientointerno.js');
module.exports = Backbone.Collection.extend({
	model: Mrequerimientointerno,
	url: App.root + '/requerimiento_interno',
	initialize: function(){
		this.url = this.url + '?page=' + App.paginaCurrent;
	}
});