var CModal = require('../classes/Cpopup.js');
module.exports = Backbone.View.extend({
	className:'modal fade  vistaModal',		
	initialize : function(modelo){
		var self = this;
		this.model = modelo;
		var contenido = this.model.msgEliminar();
		this.template = new CModal({titulo:'Ventana de confirmación',
									labelGuardar:'Aceptar',
									labelCerrar:'Cancelar',
									contenidoHTML:contenido});
		self.$el.attr('data-keyboard','false');
		self.$el.attr('data-backdrop','static');
		this.render();
		this.model.on('change',function(){
			self.render();
		});		
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
		
		this.$el.find(".btnGuardar").on("click",function(){ //Btn Aceptar
			self.quitarVentana();
			self.model.destroy();
			toastr.success(self.model.msgConfirmEliminar(),'Entidades Bancarias');
		});
		this.$el.on('hidden.bs.modal',function(){
			self.quitarVentana();
		});
		this.$el.on('shown.bs.modal',function(){
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
		console.log('este es el template',this.template.template);
		this.template = _.template(this.template.template,this.model.toJSON());
		this.$el.html(this.template);
		//if(this.model.get('control') === false ){
			//this.$el.find('.btnControl').hide();
		//}
		return this;
	}
});