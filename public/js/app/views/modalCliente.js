var CModal = require('../classes/Cpopup.js');
module.exports = Backbone.View.extend({
	className:'modal fade vistaModal',		
	initialize : function(modelo){
		var self = this;
		var contenido = $('#formCliente').html();
		this.template = new CModal({titulo:'Datos del Cliente',
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
			$("#FormularioCliente").validate({
			  	submitHandler: function(form) {	
					var cliente = {
						'razon_social' : self.$el.find('.razon_social').val(),
						'tipo_doc' : self.$el.find('.tipo_doc').val(),
						'num_doc' : self.$el.find('.num_doc').val(),
						'dir_domicilio' : self.$el.find('.dir_domicilio').val(),
						'web' : self.$el.find('.web').val(),
						'descripcion' : self.$el.find('.descripcion').val()
					};
					self.model.save(cliente,{
						success: function(modelo_serv,response){
							
							if(!modelo_serv._previousAttributes.id){
								gridCliente.addOneFirst(modelo_serv);
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
				$("#FormularioCliente").trigger('submit');				
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