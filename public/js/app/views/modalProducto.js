var CModal = require('../classes/Cpopup.js');
var CollectCategoria = require('../collections/categoria.js');
var CollectUnidad = require('../collections/unidad.js');
module.exports = Backbone.View.extend({
	className:'modal fade vistaModal',		
	initialize : function(modelo){
		var self = this;
		var contenido = $('#formProducto').html();
		this.template = new CModal({titulo:'Datos del producto',
									contenidoHTML:contenido});
		self.$el.attr('data-keyboard','false');
		self.$el.attr('data-backdrop','static');
		this.model = modelo;
		this.model.on('change',function(){
			self.model.determinarUrl();
		});
		this.render();		
	},
	addOneCategoria: function(modelo){
		var option = $('<option>');
		option.val(modelo.get('id'));
		option.append(modelo.get('nombre'));
		if(modelo.get('id') == this.model.get('categoria_id')){
			option.attr('selected',true);
		}
		$('select.categoria').append(option);		
	},
	addOneUnidad: function(modelo){
		var option = $('<option>');
		option.val(modelo.get('id'));
		option.append(modelo.get('nombre'));
		if(modelo.get('id') == this.model.get('unidad_id')){
			option.attr('selected',true);
		}
		$('select.unidad').append(option);		
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
			self.collectCategorias = new CollectCategoria();
			self.collectCategorias.on('add',function(model){self.addOneCategoria(model)});
			self.collectCategorias.url = App.root + '/categoria/all';
			self.collectCategorias.fetch();

			self.collectUnidad = new CollectUnidad();
			self.collectUnidad.on('add',function(model){self.addOneUnidad(model)});
			self.collectUnidad.fetch();

			$("#FormularioProducto").validate({
			  	submitHandler: function(form) {	
					var obj = {
						'nombre' : self.$el.find('.nombre').val(),
						'descripcion' : self.$el.find('.descripcion').val(),
						'precio_venta' : self.$el.find('.precio_venta').val(),
						'precio_base' : self.$el.find('.precio_base').val(),
						'precio_base' : self.$el.find('.precio_base').val(),
						'stock_minimo' : self.$el.find('.stock_minimo').val(),
						'stock_maximo' : self.$el.find('.stock_maximo').val(),
						'unidad_id' : self.$el.find('.unidad').val(),
						'categoria_id' : self.$el.find('.categoria').val(),
					};
					self.model.save(obj,{
						success: function(modelo_serv,response){
							//console.log('metodo save categoria',response,modelo_serv); 	
							if(!modelo_serv._previousAttributes.id){
								gridProducto.addOneFirst(modelo_serv);
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
				$("#FormularioProducto").trigger('submit');				
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