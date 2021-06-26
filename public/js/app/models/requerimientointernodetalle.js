module.exports = Backbone.Model.extend({
	defaults: {
		nombre: '',
		unidad: '',
		cantidad: '',
		producto_id: 0,
		requerimiento_id: 0
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
		if(this.get('nombre')){
			this.url = App.root + '/requerimiento_interno/' + this.get('nombre');	
		}else{
			this.url = App.root + '/requerimiento_interno';	
		}
	}

});