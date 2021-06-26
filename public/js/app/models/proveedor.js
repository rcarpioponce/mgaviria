module.exports = Backbone.Model.extend({
	defaults: {
		razon_social: '',
		ruc: '',
		web: 'http://www.',
		descripcion: '',
		direccion: '',
		correo: '',
		banco: '',
		tipo_moneda: 'soles',
		nro_cta: '',
		telefono: '',
		contacto: ''
	},
	msgEliminar: function(){
		return 'Esta seguro de eliminar el proveedor: <strong>'+this.get('razon_social')+'</strong> ?';
	},
	msgConfirmEliminar: function(){
		return 'El proveedor <strong>'+this.get('razon_social')+'</strong> ha sido eliminado';
	},
	msgConfirmAgregar: function(){
		return 'Se ha agregado el proveedor: <b>'+this.get('razon_social')+'</b>';
	},
	msgConfirmEditar: function(){
		return 'Se ha actualizado el proveedor: <b>'+this.get('razon_social')+'</b>';
	},
	initialize: function(){
		this.determinarUrl();
	},
	determinarUrl : function(){
		if(this.get('id')){
			this.url = App.root + '/proveedor/' + this.get('id');	
		}else{
			this.url = App.root + '/proveedor';	
		}
	}

});