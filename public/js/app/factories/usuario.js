var Cajax = require('../classes/Cajax.js');
var Cusuario = require('../collections/usuario.js');
module.exports = function(pagina){
	var $el = $('<div>');
	$el.collection = new Cusuario(pagina);
	$el.ajax  = new Cajax($el.collection.url);
	$el.ajax.on('complete',function(){
		$el.arUsuarios = $el.ajax.models;
		$el.collection.add($el.arUsuarios);
		$('#paginador').twbsPagination({
	        totalPages: $el.ajax.data.last_page,
	        visiblePages: 4,
	        startPage:$el.ajax.data.current_page,
	        href: '#usuarios/{{number}}/'+ App.filtro
		});

	});
	$el.ajax.execute();
	return $el;
}