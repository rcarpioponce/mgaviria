var Cajax = require('../classes/Cajax.js');
var Crequerimiento = require('../collections/requerimiento.js');
module.exports = function(pagina){
	var $el = $('<div>');
	$el.collection = new Crequerimiento(pagina);
	$el.ajax  = new Cajax($el.collection.url);
	$el.ajax.on('complete',function(){
		$el.arrRequeriemientos = $el.ajax.models;
		$el.collection.add($el.arrRequeriemientos);
		$('#paginador').twbsPagination({
	        totalPages: $el.ajax.data.last_page,
	        visiblePages: 4,
	        startPage:$el.ajax.data.current_page,
	        href: '#requerimientos/{{number}}/'+ App.filtro
		});

	});
	$el.ajax.execute();
	return $el;
}