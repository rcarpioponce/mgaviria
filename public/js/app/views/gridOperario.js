var Coperario = require('../collections/operario.js');
var Mgrid = require('../models/grid.js');
var VrowOperario = require('../views/rowOperario.js');
var Foperario = require('../factories/operario.js');
module.exports = Backbone.View.extend({
	initialize: function(){
		this.templateHtml = $('#table').html();
		this.clase = 'gridOperario';
		this.claseSelector = '.' + this.clase;
		var object = {
			cabecera: ['Id','Código','Nombres','Apellidos','Acciones'],
			clase: this.clase
		};
		this.model = new Mgrid(object);
		this.factOperario = new Foperario();
		this.listenTo(this.factOperario.collection,'add',this.addOne);
		this.listenTo(this.factOperario.collection,'reset',this.addAll);
	},
	addOne: function(model,append){
		var row = new VrowOperario(model);
		this.grid.append(row.$el);
	},
	addOneFirst: function(model,append){
		var row = new VrowOperario(model);
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