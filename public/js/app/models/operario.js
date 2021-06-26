module.exports = Backbone.Model.extend({
	defaults: {
		codigo: '',
		dni: '',
		nombres: '',
		apellidos: '',
		estado: 'activo',
	},
	msgEliminar: function(){
		return 'Esta seguro de eliminar al operario: <strong>'+this.get('nombres')+'</strong> ?';
	},
	msgConfirmEliminar: function(){
		return 'el operario <strong>'+this.get('nombres')+'</strong> ha sido eliminado';
	},
	msgConfirmAgregar: function(){
		return 'Se ha agregado el operario: <b>'+this.get('nombres')+'</b>';
	},
	msgConfirmEditar: function(){
		return 'Se ha actualizado el operario: <b>'+this.get('nombres')+'</b>';
	},
	initialize: function(){
		this.determinarUrl();
	},
	determinarUrl : function(){
		if(this.get('id')){
			this.url = App.root + '/operario/' + this.get('id');	
		}else{
			this.url = App.root + '/operario';	
		}
	}

});