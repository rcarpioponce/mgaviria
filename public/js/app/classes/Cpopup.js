module.exports = function(options){
	var elemento = $('<div>');
	elemento.htmlTemplate = $('#popup').html();
	elemento.setTemplate = function (options){
		var defaults = {
			titulo : '(Sin titulo)',
			btnCerrar : true,
			btnGuardar : true,
			labelGuardar : 'Guardar',
			labelCerrar : 'Cerrar',
			contenidoHTML : '',
			tamano: '' //'modal-lg'
		};
		var settings = $.extend({}, defaults, options);
		elemento.template = _.template(elemento.htmlTemplate,settings);
		//console.log(settings);
	}
	elemento.setTemplate(options);
	return elemento;
}