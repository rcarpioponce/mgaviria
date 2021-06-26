var CollectLocal = require('../collections/local.js');
var CollectProducto = require('../collections/producto.js');

module.exports = function (titulo){
	var $el = $('<div>');
	$el.work_area = $('#work_area');
	$el.init = function(){
		$el.titulo = 'Reporte por Local';
		$el.filtro = [];
		$el.divPrincipal = $("<div class='row'>");
		$el.dibujarFiltros();
	}
	$el.dibujarFiltros = function(){
		$el.dibujarSelectLocal();
		$el.dibujarSelectProducto();
		$el.dibujarRangoFechas();
		$('#tituloModulo').html($el.titulo);
		$('#botoneraModulo').empty();
		$('#work_area').empty();
		$('#botoneraModulo').append($el.divPrincipal);
		$('.date').datepicker({
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            format: 'yyyy-mm-dd',
        });
		$el.collectLocal = new CollectLocal();
		$el.collectLocal.on('add',function(model){$el.addOneLocal(model)});
		$el.collectLocal.fetch({
			success: function(){
				$("select.local").chosen();
			}
		});
		$el.collectProducto = new CollectProducto();
		$el.collectProducto.on('add',function(model){$el.addOneProducto  (model)});
		$el.collectProducto.url = App.root + '/producto/all';
		$el.collectProducto.fetch({
			success: function(){
				$('select.producto').chosen();
			}
		});		        		
	},
	$el.addOneProducto = function(modelo){
		var option = $('<option>');
		option.val(modelo.get('id'));
		option.append(modelo.get('nombre'));
		option.data(modelo.attributes);
		$('select.producto').append(option);		
	},		
	$el.dibujarSelectLocal = function(){
		$el.filtro.local = $('<select required>');
		var filtro = $el.filtro.local;
		filtro.addClass('form-control local');
		var option = $("<option>");
		option.val("");
		option.append("Seleccione Local");
		filtro.append(option);
		var div = $('<div class="col-lg-6">');
		div.append(filtro);
		$el.divPrincipal.append(div);
	}
	$el.addOneLocal = function(modelo){
		var option = $('<option>');
		option.val(modelo.get('id'));
		option.append(modelo.get('nombre'));
		$('select.local').append(option);		
	},	
	$el.dibujarSelectProducto = function(){
		$el.filtro.local = $('<select required>');
		var filtro = $el.filtro.local;
		filtro.addClass('form-control producto');
		var option = $("<option>");
		option.val("");
		option.append("Seleccione Producto");
		filtro.append(option);
		var div = $('<div class="col-lg-6">');
		div.append(filtro);
		$el.divPrincipal.append(div);
	}	
	$el.dibujarRangoFechas = function(){
		$el.filtro.fechaInicio = $('<input type="text" placeholder="Fecha de Inicio">');
		$el.filtro.fechaFin = $('<input type="text" placeholder="Fecha de Fin">');
		var filtroI = $el.filtro.fechaInicio;
		var filtroF = $el.filtro.fechaFin;
		filtroI.addClass('form-control fecha_inicio date');
		filtroF.addClass('form-control fecha_fin date');
		var div = $('<div class="col-lg-6">');
		div.append(filtroI);
		$el.divPrincipal.append(div);	
		var divS = $('<div class="col-lg-6">');
		divS.append(filtroF);
		$el.divPrincipal.append(divS);				
	}

	$el.init();
	return $el;	
}