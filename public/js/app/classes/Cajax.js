module.exports = function(url,options){
	//falta definir las opciones por defecto
	//revisar esta pagina http://api.jquery.com/jquery.ajax/
	var $el = $('<div>');
	$el.ajaxObj = $.ajax({
		url: url,
		method: 'get',
		data: $('#filtro').serializeObject()
	});

	$el.execute = function(){
		$el.ajaxObj.done(function( data ){
		  	if(data.data){
			  	$el.models = data.data;
			  	data.data = null;
			  	$el.data = data;
		  	}else{
		  		$el.data = data;
		  	}
			$el.trigger('complete');		  		
		});		
	};	
	return $el;
}