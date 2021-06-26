var Cajax = require('../classes/Cajax.js');
var Ccategoria = require('../collections/categoria.js');
module.exports = function(pagina){
	var $el = $('<div>');
	$el.collection = new Ccategoria(pagina);
	$el.ajax  = new Cajax($el.collection.url);
	$el.ajax.on('complete',function(){
		$el.arCategorias = $el.ajax.models;
		$el.collection.add($el.arCategorias);
		$('#paginador').twbsPagination({
	        totalPages: $el.ajax.data.last_page,
	        visiblePages: 4,
	        startPage:$el.ajax.data.current_page,
	        href: '#categorias/{{number}}/'+ App.filtro
		});

	});
	$el.ajax.execute();
	return $el;
}