module.exports = Backbone.Model.extend({
	defaults: {
		tipo: 'uso operario',
		estado: 'pendiente',
		local_id: 0,
		local: '',
		user_id: 0
	},
	msgEliminar: function(){
		return 'Esta seguro de eliminar el requerimiento con id: <strong>'+this.get('id')+'</strong> ?';
	},
	msgConfirmEliminar: function(){
		return 'El requerimiento con id <strong>'+this.get('id')+'</strong> ha sido eliminada';
	},
	msgConfirmAgregar: function(){
		return 'Se ha agregado el requerimiento con id: <b>'+this.get('id')+'</b>';
	},
	msgConfirmEditar: function(){
		return 'Se ha actualizado el requerimiento con id: <b>'+this.get('id')+'</b>';
	},
	msgConfirmAprobado: function(){
		return 'El requerimiento con id: <b>'+this.get('id')+'</b> ha sido aprobado';
	},
	initialize: function(){
		this.determinarUrl();
	},
	determinarUrl : function(){
		if(this.get('id')){
			this.url = App.root + '/requerimiento_interno/' + this.get('id');	
		}else{
			this.url = App.root + '/requerimiento_interno';	
		}
	}

});