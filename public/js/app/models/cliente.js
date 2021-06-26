module.exports = Backbone.Model.extend({
	defaults: {
		razon_social: '',
		tipo_doc: '',
		num_doc: '',
		dir_domicilio: '',
		web: '',
		descripcion: ''

	},
	msgEliminar: function(){
		return 'Esta seguro de eliminar el cliente: <strong>'+this.get('razon_social')+'</strong> ?';
	},
	msgConfirmEliminar: function(){
		return 'El cliente <strong>'+this.get('razon_social')+'</strong> ha sido eliminado';
	},
	msgConfirmAgregar: function(){
		return 'Se ha agregado el cliente: <b>'+this.get('razon_social')+'</b>';
	},
	msgConfirmEditar: function(){
		return 'Se ha actualizado el cliente: <b>'+this.get('razon_social')+'</b>';
	},
	initialize: function(){
		this.determinarUrl();
	},
	determinarUrl : function(){
		if(this.get('id')){
			this.url = App.root + '/cliente/' + this.get('id');	
		}else{
			this.url = App.root + '/cliente';	
		}
	}

});