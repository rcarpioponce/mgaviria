var modalConfirm = require('../views/modalConfirm.js');
var CollectProducto = require('../collections/producto.js');
module.exports = Backbone.View.extend({
	tagName: 'tr',
	initialize: function(model){
		var self = this;
		this.model = model ? model : false;
		this.templateHtml = $('#rowRequerimientoInternoDetalle').html();
/*		this.model.on('change',function(){
			self.render();
			self.eventos();
		});*/
/*		this.model.on('remove',function(){
			self.$el.remove();
		});*/		
		this.render();
		this.eventos();
	},
	eventos: function(){
		var self = this;
/*		this.btnEditar.on('click',function(event){
			event.preventDefault();
			var modal = new modalRequerimiento(self.model);
			modal.mostrar();   
		});*/
		this.btnEliminar.on('click',function(event){
			event.preventDefault();
			/*var modal = new modalConfirm(self.model);
			modal.mostrar();*/   
		});
		self.collectProducto = new CollectProducto();
		self.collectProducto.on('add',function(model){self.addOneProducto  (model)});
		self.collectProducto.url = App.root + '/producto/all';
		self.collectProducto.fetch({
			success: function(){
				self.$el.find('select.idProducto').chosen();
			}
		});
		self.$el.find('select.idProducto').on('change',function(){
				var option = self.$el.find("select.idProducto option:selected");
				var unidad_id = option.data('unidad_id');	
				var nombre_unidad = option.data('nombre_unidad');	
				var cantidad = 1;
				var nombre = option.data('nombre');
				self.$el.find('.idUnidad').val(unidad_id);
				self.$el.find('.unidad').val(nombre_unidad);	
				self.$el.find('.cantidad').val(cantidad);
				self.$el.find('.nombreProducto').val(nombre);
		});
/*		self.txtCantidad.on('keyup',function(){
			self.actualizarDatos();
		});*/		
		self.btnEliminar.on('click',function(){
			self.$el.remove();
		});
	},
/*	actualizarDatos: function(){
		var precio = this.txtPxunidad.val();
		var cantidad = this.txtCantidad.val();
		var subtotal = precio * cantidad;
		this.txtSubtotal.val(subtotal);
		
		var todosSubtotal = $('input.subtotal');
		var i,suma=0;
		for(i=0;i<todosSubtotal.length;i++){
			suma = suma + parseFloat($(todosSubtotal[i]).val());
		}
		$('.total_req').val(suma);
	},*/
	addOneProducto : function(modelo){
		var option = $('<option>');
		option.val(modelo.get('id'));
		option.append(modelo.get('nombre'));
		option.data(modelo.attributes);
		this.$el.find('select.idProducto').append(option);		
	},	
	render: function(){
		console.log('row', this.model);
		if(this.model){
			this.template =  _.template(this.templateHtml,this.model.toJSON());	
		}else{
			this.template =  _.template(this.templateHtml);	
		}
		this.$el.html(this.template);
		this.btnEliminar = this.$el.find('.btnEliminar');
		this.txtCantidad = this.$el.find('.cantidad');
		return this;
	}
});