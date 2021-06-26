var Ccategoria = require('../collections/categoria.js');
var Mgrid = require('../models/grid.js');
var VrowCategoria = require('../views/rowCategoria.js');
var Fcategoria = require('../factories/categoria.js');
module.exports = Backbone.View.extend({
	initialize: function(){
		this.templateHtml = $('#table').html();
		this.clase = 'gridCategoria';
		this.claseSelector = '.' + this.clase;
		var object = {
			cabecera: ['Id','Nombre','Estado','Acciones'],
			clase: this.clase
		};
		this.model = new Mgrid(object);
		this.factCategoria = new Fcategoria();
		this.listenTo(this.factCategoria.collection,'add',this.addOne);
		this.listenTo(this.factCategoria.collection,'reset',this.addAll);
	},
	addOne: function(model,append){
		var row = new VrowCategoria(model);
		this.grid.append(row.$el);
	},
	addOneFirst: function(model,append){
		var row = new VrowCategoria(model);
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
		//console.log('la pagina en el grid',this.pagina);
		this.template = _.template(this.templateHtml,this.model.toJSON());
		this.$el.html(this.template);
		this.grid = this.$el.find(this.claseSelector);
		//this.collection.fetch();
		return this;
	}
});