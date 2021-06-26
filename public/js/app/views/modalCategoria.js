var CModal = require('../classes/Cpopup.js');
module.exports = Backbone.View.extend({
	className:'modal fade vistaModal',		
	initialize : function(modelo){
		var self = this;
		var contenido = $('#formCategoria').html();
		this.template = new CModal({titulo:'Datos de la categoría',
									contenidoHTML:contenido});
		self.$el.attr('data-keyboard','false');
		self.$el.attr('data-backdrop','static');
		this.model = modelo;
		this.model.on('change',function(){
			self.model.determinarUrl();
		});
		this.render();		
	},
	mostrar:function(){
		var self = this;
		if(this.model.get('control') === false ){
			this.$el.modal({keyboard: false,
    		backdrop: false});	
		}
		else{
			self.$el.modal('toggle');
		}

		this.$el.on('hidden.bs.modal',function(){
			self.quitarVentana();
		});
		this.$el.on('shown.bs.modal',function(){
			$("#FormularioCategoria").validate({
			  	submitHandler: function(form) {	
					var categoria = {
						'nombre' : self.$el.find('.nombre').val(),
						'estado' : self.$el.find('.estado').val(),
					};
					self.model.save(categoria,{
						success: function(modelo_serv,response){
							//console.log('metodo save categoria',response,modelo_serv); 	
							if(!modelo_serv._previousAttributes.id){
								gridCategoria.addOneFirst(modelo_serv);
								toastr.success(self.model.msgConfirmAgregar());
							}else{
								toastr.success(self.model.msgConfirmEditar());
							}
							self.quitarVentana();
						}
					});			  			
				}
			});
			self.$el.find(".btnGuardar").on("click",function(){
				$("#FormularioCategoria").trigger('submit');				
			});		
		});
	},			
	quitarVentana:function(){
		var self = this;	
		self.$el.modal('hide');
   		setTimeout(function(){
   			self.$el.remove();	
   		},1000);
	},	
	render: function() {
		var self = this;
		this.template = _.template(this.template.template,this.model.toJSON());
		this.$el.html(this.template);
		if(this.model.get('control') === false ){
			this.$el.find('.btnControl').hide();
		}
		return this;
	}
});