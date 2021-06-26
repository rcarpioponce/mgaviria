var Mgrid = require('../models/grid.js');
var VrowCliente = require('../views/rowCliente.js');
var Fcliente = require('../factories/cliente.js');
module.exports = Backbone.View.extend({
	initialize: function(){
		this.templateHtml = $('#table').html();
		this.clase = 'gridCliente';
		this.claseSelector = '.' + this.clase;
		var object = {
			cabecera: ['Id','Tipo de documento','Nro. de documento','Razón Social','Acciones'],
			clase: this.clase
		};
		this.model = new Mgrid(object);
		this.factCliente = new Fcliente();
		this.listenTo(this.factCliente.collection,'add',this.addOne);
		this.listenTo(this.factCliente.collection,'reset',this.addAll);
	},
	addOne: function(model,append){
		var row = new VrowCliente(model);
		this.grid.append(row.$el);
	},
	addOneFirst: function(model,append){
		var row = new VrowCliente(model);
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