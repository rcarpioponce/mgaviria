var Cbanco = require('../collections/banco.js');
var Mgrid = require('../models/grid.js');
var VrowBanco = require('../views/rowBanco.js');
module.exports = Backbone.View.extend({
	initialize: function(){
		this.templateHtml = $('#table').html();
		this.clase = 'gridBanco';
		this.claseSelector = '.' + this.clase;
		var object = {
			cabecera: ['Id','Nombre','Estado','Acciones'],
			clase: this.clase
		};
		this.model = new Mgrid(object);
		this.collection = new Cbanco();
		this.listenTo(this.collection,'add',this.addOne);
		this.listenTo(this.collection,'reset',this.addAll);
	},
	addOne: function(model){
		var row = new VrowBanco(model);
		this.grid.append(row.$el);
	},
	addAll: function(){
		var self = this;
		self.grind.empty();
		self.collection.models.forEach(function(model){
			self.addOne(model);
		});
	},
	render: function(){
		//console.log(this.model.get('cabecera'));
		this.template = _.template(this.templateHtml,this.model.toJSON());
		this.$el.html(this.template);
		this.grid = this.$el.find(this.claseSelector);
		this.collection.fetch();
		return this;
	}
});