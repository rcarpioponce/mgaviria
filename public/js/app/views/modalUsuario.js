var CModal = require('../classes/Cpopup.js');
var CollectPerfil = require('../collections/perfil.js');
module.exports = Backbone.View.extend({
	className:'modal fade vistaModal',		
	initialize : function(modelo){
		var self = this;
		var contenido = $('#formUsuario').html();
		this.template = new CModal({titulo:'Datos del usuario',
									contenidoHTML:contenido});
		self.$el.attr('data-keyboard','false');
		self.$el.attr('data-backdrop','static');
		this.model = modelo;
		this.model.on('change',function(){
			self.model.determinarUrl();
		});
		this.render();		
	},
	addOnePerfil  : function(modelo){
		var option = $('<option>');
		option.val(modelo.get('id'));
		option.append(modelo.get('nombre'));
		if(modelo.get('id') == this.model.get('perfil_id')){
			option.attr('selected',true);
		}
		option.data(modelo.attributes);
		$('select.perfil').append(option);		
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

			self.collectPerfil = new CollectPerfil();
			self.collectPerfil.on('add',function(model){self.addOnePerfil(model)});
			self.collectPerfil.url = App.root + '/perfil';
			self.collectPerfil.fetch({
				success: function(){
					$(".perfil").chosen();
				}
			});

			$("#FormularioUsuario").validate({
			  	submitHandler: function(form) {
			  			console.log(form);
					var usuario = $("#FormularioUsuario").serializeObject();
					self.model.save(usuario,{
						success: function(modelo_serv,response){
							if(!modelo_serv._previousAttributes.id){
								gridUsuario.addOneFirst(modelo_serv);
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
				$("#FormularioUsuario").trigger('submit');				
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