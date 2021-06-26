var Cajax = require('../classes/Cajax.js');
var Ccliente = require('../collections/cliente.js');
module.exports = function(pagina){
	var $el = $('<div>');
	$el.collection = new Ccliente(pagina);
	$el.ajax  = new Cajax($el.collection.url);
	$el.ajax.on('complete',function(){
		$el.arClientes = $el.ajax.models;
		$el.collection.add($el.arClientes);
		$('#paginador').twbsPagination({
	        totalPages: $el.ajax.data.last_page,
	        visiblePages: 4,
	        startPage:$el.ajax.data.current_page,
	        href: '#clientes/{{number}}/'+ App.filtro
		});

	});
	$el.ajax.execute();
	return $el;
}