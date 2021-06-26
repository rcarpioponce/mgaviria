var Cajax = require('../classes/Cajax.js');
var Cmarca = require('../collections/marca.js');
module.exports = function(pagina){
	var $el = $('<div>');
	$el.collection = new Cmarca(pagina);
	$el.ajax  = new Cajax($el.collection.url);
	$el.ajax.on('complete',function(){
		$el.arMarcas = $el.ajax.models;
		$el.collection.add($el.arMarcas);
		$('#paginador').twbsPagination({
	        totalPages: $el.ajax.data.last_page,
	        visiblePages: 4,
	        startPage:$el.ajax.data.current_page,
	        href: '#marcas/{{number}}/'+ App.filtro
		});

	});
	$el.ajax.execute();
	return $el;
}