var Mproveedor = require('../models/proveedor.js');
module.exports = Backbone.Collection.extend({
	model: Mproveedor,
	url: App.root + '/proveedor',
	initialize: function(){
		this.url = this.url + '?page=' + App.paginaCurrent;
	}
});