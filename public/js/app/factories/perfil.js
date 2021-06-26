var Cajax = require('../classes/Cajax.js');
var Cperfil = require('../collections/perfil.js');
module.exports = function(pagina){
	var $el = $('<div>');
	$el.collection = new Cperfil(pagina);
	$el.ajax  = new Cajax($el.collection.url);
	$el.ajax.on('complete',function(){
		$el.arPerfil = $el.ajax.models;
		$el.collection.add($el.arPerfil);
		$('#paginador').twbsPagination({
	        totalPages: $el.ajax.data.last_page,
	        visiblePages: 4,
	        startPage:$el.ajax.data.current_page,
	        href: '#perfil/{{number}}/'+ App.filtro
		});

	});
	$el.ajax.execute();
	return $el;
}