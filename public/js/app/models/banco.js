module.exports = Backbone.Model.extend({
	defaults: {
		nombre: '',
		estado: 'activo',
	},
	msgEliminar: function(){
		return 'Esta seguro de eliminar la entidad bancaria: <strong>'+this.get('nombre')+'</strong> ?';
	},
	msgConfirmEliminar: function(){
		return 'La entidad bancaria <strong>'+this.get('nombre')+'</strong> ha sido eliminada';
	},
	msgConfirmAgregar: function(){
		return 'Se ha agregado la entidad bancaria: <b>'+this.get('nombre')+'</b>';
	},
	msgConfirmEditar: function(){
		return 'Se ha actualizado la entidad bancaria: <b>'+this.get('nombre')+'</b>';
	},
	initialize: function(){
		this.determinarUrl();
	},
	determinarUrl : function(){
		if(this.get('id')){
			this.url = App.root + '/banco/' + this.get('id');	
		}else{
			this.url = App.root + '/banco';	
		}
	}

});