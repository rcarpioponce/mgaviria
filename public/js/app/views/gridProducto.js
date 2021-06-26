//var Ccategoria = require('../collections/categoria.js');
var Mgrid = require('../models/grid.js');
var VrowProducto = require('../views/rowProducto.js');
var Fproducto = require('../factories/producto.js');
module.exports = Backbone.View.extend({
	initialize: function(){
		this.templateHtml = $('#table').html();
		this.clase = 'gridProducto';
		this.claseSelector = '.' + this.clase;
		var object = {
			cabecera: ['Id','Nombre','Precio de venta','Precio base','Unidad','Categoria','Stock','Acciones'],
			clase: this.clase
		};
		this.model = new Mgrid(object);
		this.factProducto = new Fproducto();
		this.listenTo(this.factProducto.collection,'add',this.addOne);
		this.listenTo(this.factProducto.collection,'reset',this.addAll);
	},
	addOne: function(model,append){
		var row = new VrowProducto(model);
		this.grid.append(row.$el);
	},
	addOneFirst: function(model,append){
		var row = new VrowProducto(model);
		this.grid.prepend(row.$el);
		this.grid.find('tr:last-child').remove();
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