var Mgrid = require('../models/grid.js');
var VrowProveedor = require('../views/rowProveedor.js');
var Fproveedor = require('../factories/proveedor.js');
module.exports = Backbone.View.extend({
	initialize: function(){
		this.templateHtml = $('#table').html();
		this.clase = 'gridProveedor';
		this.claseSelector = '.' + this.clase;
		var object = {
			cabecera: ['Id','RUC','Razón Social','Acciones'],
			clase: this.clase
		};
		this.model = new Mgrid(object);
		this.factProveedor = new Fproveedor();
		this.listenTo(this.factProveedor.collection,'add',this.addOne);
		this.listenTo(this.factProveedor.collection,'reset',this.addAll);
	},
	addOne: function(model,append){
		var row = new VrowProveedor(model);
		this.grid.append(row.$el);
	},
	addOneFirst: function(model,append){
		var row = new VrowProveedor(model);
		this.grid.prepend(row.$el);
		if(this.grid.find('tr').length == 15){
			this.grid.find('tr:last-child').remove();
		}
	},	
	addAll: function(){
		var self = this;
		self.grind.empty();
		self.collection.models.forEach(function(model){
			self.addOne(model);
		});
	},
	render: function(){
		this.template = _.template(this.templateHtml,this.model.toJSON());
		this.$el.html(this.template);
		this.grid = this.$el.find(this.claseSelector);
		return this;
	}
});