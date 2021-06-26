var Mgrid = require('../models/grid.js');
var VrowRequerimiento = require('../views/rowRequerimiento.js');
var Frequerimiento = require('../factories/requerimiento.js');
module.exports = Backbone.View.extend({
	initialize: function(){
		this.templateHtml = $('#table').html();
		this.clase = 'gridRequerimiento';
		this.claseSelector = '.' + this.clase;
		var object = {
			cabecera: ['Id','RUC','Razon Social','Monto total','Fecha de creación','Fecha de entrega','Estado','Acciones'],
			clase: this.clase
		};
		this.model = new Mgrid(object);
		this.factRequerimiento = new Frequerimiento();
		this.listenTo(this.factRequerimiento.collection,'add',this.addOne);
		this.listenTo(this.factRequerimiento.collection,'reset',this.addAll);
	},
	addOne: function(model,append){
		var row = new VrowRequerimiento(model);
		this.grid.append(row.$el);
	},
	addOneFirst: function(model,append){
		var row = new VrowRequerimiento(model);
		this.grid.prepend(row.$el);
		if(this.grid.find('tr').length == 10){
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