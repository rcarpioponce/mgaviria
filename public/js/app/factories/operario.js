var Cajax = require('../classes/Cajax.js');
var Coperario = require('../collections/operario.js');
module.exports = function(pagina){
	var $el = $('<div>');
	$el.collection = new Coperario(pagina);
	$el.ajax  = new Cajax($el.collection.url);
	$el.ajax.on('complete',function(){
		$el.arOperarios = $el.ajax.models;
		$el.collection.add($el.arOperarios);
		$('#paginador').twbsPagination({
	        totalPages: $el.ajax.data.last_page,
	        visiblePages: 4,
	        startPage:$el.ajax.data.current_page,
	        href: '#operarios/{{number}}/'+ App.filtro
		});

	});
	$el.ajax.execute();
	return $el;
}