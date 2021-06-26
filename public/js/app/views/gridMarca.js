var Cmarca = require('../collections/marca.js');
var Mgrid = require('../models/grid.js');
var VrowMarca = require('../views/rowMarca.js');
var Fmarca = require('../factories/marca.js');
module.exports = Backbone.View.extend({
	initialize: function(){
		this.templateHtml = $('#table').html();
		this.clase = 'gridMarca';
		this.claseSelector = '.' + this.clase;
		var object = {
			cabecera: ['Id','Nombre','Estado','Acciones'],
			clase: this.clase
		};
		this.model = new Mgrid(object);
		this.factMarca = new Fmarca();
		this.listenTo(this.factMarca.collection,'add',this.addOne);
		this.listenTo(this.factMarca.collection,'reset',this.addAll);
	},
	addOne: function(model,append){
		var row = new VrowMarca(model);
		this.grid.append(row.$el);
	},
	addOneFirst: function(model,append){
		var row = new VrowMarca(model);
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