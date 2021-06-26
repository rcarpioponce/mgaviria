var Cusuario = require('../collections/usuario.js');
var Mgrid = require('../models/grid.js');
var VrowUsuario = require('../views/rowUsuario.js');
var Fusuario = require('../factories/usuario.js');
module.exports = Backbone.View.extend({
	initialize: function(){
		this.templateHtml = $('#table').html();
		this.clase = 'gridUsuario';
		this.claseSelector = '.' + this.clase;
		var object = {
			cabecera: ['Id','Dni','Nombres','Apellidos','Email','Perfil','Acciones'],
			clase: this.clase
		};
		this.model = new Mgrid(object);
		this.factUsuario = new Fusuario();
		this.listenTo(this.factUsuario.collection,'add',this.addOne);
		this.listenTo(this.factUsuario.collection,'reset',this.addAll);
	},
	addOne: function(model,append){
		var row = new VrowUsuario(model);
		this.grid.append(row.$el);
	},
	addOneFirst: function(model,append){
		var row = new VrowUsuario(model);
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