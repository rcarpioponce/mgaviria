var CModal = require('../classes/Cpopup.js');
var CollectBanco = require('../collections/banco.js');
module.exports = Backbone.View.extend({
	className:'modal fade vistaModal',		
	initialize : function(modelo){
		var self = this;
		var contenido = $('#formProveedor').html();
		this.template = new CModal({titulo:'Datos del Proveedor',tamano:'modal-lg',
									contenidoHTML:contenido});
		self.$el.attr('data-keyboard','false');
		self.$el.attr('data-backdrop','static');
		this.model = modelo;
		this.model.on('change',function(){
			self.model.determinarUrl();
		});
		this.render();		
	},
	addOneBanco: function(modelo){
		var option = $('<option>');
		option.val(modelo.get('id'));
		option.append(modelo.get('nombre'));
		if(modelo.get('id') == this.model.get('banco_id')){
			option.attr('selected',true);
		}
		$('.banco_id').append(option);		
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
			self.collectBancos = new CollectBanco();
			self.collectBancos.on('add',function(model){self.addOneBanco(model)});
			self.collectBancos.fetch();

			console.log(self.model);
			$('select.tipo_moneda').val(self.model.get('tipo_moneda'));

			$("#FormularioProveedor").validate({
			  	submitHandler: function(form) {	
					var proveedor = $('#FormularioProveedor').serializeObject();
					self.model.save(proveedor,{
						success: function(modelo_serv,response){
							if(!modelo_serv._previousAttributes.id){
								gridProveedor.addOneFirst(modelo_serv);
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
				$("#FormularioProveedor").trigger('submit');				
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