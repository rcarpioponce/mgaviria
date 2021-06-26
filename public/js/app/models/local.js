module.exports = Backbone.Model.extend({
	defaults: {
		nombre: '',
		estado: 'activo',
	},
	msgEliminar: function(){
		return 'Esta seguro de eliminar el local: <strong>'+this.get('nombre')+'</strong> ?';
	},
	msgConfirmEliminar: function(){
		return 'el local <strong>'+this.get('nombre')+'</strong> ha sido eliminada';
	},
	msgConfirmAgregar: function(){
		return 'Se ha agregado el local: <b>'+this.get('nombre')+'</b>';
	},
	msgConfirmEditar: function(){
		return 'Se ha actualizado el local: <b>'+this.get('nombre')+'</b>';
	},
	initialize: function(){
		this.determinarUrl();
	},
	determinarUrl : function(){
		if(this.get('id')){
			this.url = App.root + '/local/' + this.get('id');	
		}else{
			this.url = App.root + '/local';	
		}
	}

});