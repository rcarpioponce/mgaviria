module.exports = Backbone.Model.extend({
	defaults: {
		nombre: '',
		descripcion: '',
		precio_venta: 1.00,
		precio_base: 1.00,
		stock_minimo: 1,
		stock_maximo: 100,
		categoria_id: 1,
		unidad_id: 1,
		unidad: '',
		categoria: ''
	},
	msgEliminar: function(){
		return 'Esta seguro de eliminar el producto: <strong>'+this.get('nombre')+'</strong> ?';
	},
	msgConfirmEliminar: function(){
		return 'El producto <strong>'+this.get('nombre')+'</strong> ha sido eliminada';
	},
	msgConfirmAgregar: function(){
		return 'Se ha agregado el producto: <b>'+this.get('nombre')+'</b>';
	},
	msgConfirmEditar: function(){
		return 'Se ha actualizado el producto: <b>'+this.get('nombre')+'</b>';
	},
	initialize: function(){
		this.determinarUrl();
	},
	determinarUrl : function(){
		if(this.get('id')){
			this.url = App.root + '/producto/' + this.get('id');	
		}else{
			this.url = App.root + '/producto';	
		}
	}

});