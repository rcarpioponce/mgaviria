var Mrubro = require('../models/rubro.js');
module.exports = Backbone.Collection.extend({
	model: Mrubro,
	url: App.root + '/rubro',
	initialize: function(){
		this.url = this.url ; // + '?page=' + App.paginaCurrent;
	}
});