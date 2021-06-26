var Cajax = require('../classes/Cajax.js');
var Cproducto = require('../collections/producto.js');
module.exports = function(pagina){
	var $el = $('<div>');
	$el.collection = new Cproducto(pagina);
	$el.ajax  = new Cajax($el.collection.url);
	$el.ajax.on('complete',function(){
		$el.arProductos = $el.ajax.models;
		$el.collection.add($el.arProductos);
		$('#paginador').twbsPagination({
	        totalPages: $el.ajax.data.last_page,
	        visiblePages: 4,
	        startPage:$el.ajax.data.current_page,
	        href: '#productos/{{number}}/'+ App.filtro
		});

	});
	$el.ajax.execute();
	return $el;
}