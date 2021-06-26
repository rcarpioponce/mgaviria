var Cajax = require('../classes/Cajax.js');
var Cproveedor = require('../collections/proveedor.js');
module.exports = function(pagina){
	var $el = $('<div>');
	$el.collection = new Cproveedor(pagina);
	$el.ajax  = new Cajax($el.collection.url);
	$el.ajax.on('complete',function(){
		$el.arProveedores = $el.ajax.models;
		$el.collection.add($el.arProveedores);
		$('#paginador').twbsPagination({
	        totalPages: $el.ajax.data.last_page,
	        visiblePages: 4,
	        startPage:$el.ajax.data.current_page,
	        href: '#proveedores/{{number}}/'+ App.filtro
		});

	});
	$el.ajax.execute();
	return $el;
}