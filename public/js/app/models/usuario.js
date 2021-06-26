module.exports = Backbone.Model.extend({
	defaults: {
		nombres: '',
		apellidos: '',
		dni: '',
		direccion: '',
		email: '',
		perfil_id: 0,
	},
	msgEliminar: function(){
		return 'Esta seguro de eliminar el usuario: <strong>'+this.get('nombres')+' '+this.get('apellidos')+'</strong> ?';
	},
	msgConfirmEliminar: function(){
		return 'El usuario <strong>'+this.get('nombres')+' '+this.get('apellidos')+'</strong> ha sido eliminado';
	},
	msgConfirmAgregar: function(){
		return 'Se ha agregado el usuario: <b>'+this.get('nombres')+' '+this.get('apellidos')+'</b>';
	},
	msgConfirmEditar: function(){
		return 'Se ha actualizado el usuario: <b>'+this.get('nombres')+' '+this.get('apellidos')+'</b>';
	},
	initialize: function(){
		this.determinarUrl();
	},
	determinarUrl : function(){
		if(this.get('id')){
			this.url = App.root + '/usuario/' + this.get('id');	
		}else{
			this.url = App.root + '/usuario';	
		}
	}

});