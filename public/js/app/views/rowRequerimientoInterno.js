var modalRequerimientoInterno  = require('../views/modalRequerimientoInterno.js');
var modalConfirm = require('../views/modalConfirm.js');
module.exports = Backbone.View.extend({
	tagName: 'tr',
	initialize: function(model){
		var self = this;
		this.model = model;
		this.templateHtml = $('#rowRequerimientoInterno').html();
		this.model.on('change',function(){
			self.render();
			self.eventos();
		});
		this.model.on('remove',function(){
			self.$el.remove();
		});		
		this.render();
		this.eventos();
	},
	eventos: function(){
		var self = this;
		this.btnEditar.on('click',function(event){
			event.preventDefault();
			var modal = new modalRequerimientoInterno(self.model);
			modal.mostrar();   
		});	
	},
	render: function(){
		this.template =  _.template(this.templateHtml,this.model.toJSON());
		this.$el.html(this.template);
		this.btnEditar = this.$el.find('.btnEditar');
		//this.btnEliminar = this.$el.find('.btnEliminar');
		return this;
	}
});