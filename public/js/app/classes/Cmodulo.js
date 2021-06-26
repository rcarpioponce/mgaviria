module.exports = function (titulo,btnAdd,btnAddTexto,filtro){
	var el = $('<div>');
	el.work_area = $('#work_area');

	//console.log('add texto',btnAddTexto);
	el.init = function(titulo,btnAdd,btnAddTexto,filtro){		
		//console.log('add texto',btnAddTexto);	
		el.titulo = titulo ? titulo : '(sin titulo)';
		el.btnAdd = btnAdd ? btnAdd : true;
		el.btnAddTexto = btnAddTexto ? btnAddTexto : 'Agregar';
		el.filtro = filtro ? filtro : false;
		el.idTitulo = $('#tituloModulo');
		el.idBotonera = $('#botoneraModulo');

	}
	el.dibujar = function(){
		$('#paginador').remove();
		var paginador = $('<div class="col-lg-6" id="paginador">');
		$("#controles").prepend(paginador);
		$("#filtro").html('');
		el.idTitulo.empty();
		el.idBotonera.empty();
		el.setTitulo();

		//se agregar el boton agregar
		if(el.btnAdd){
			el.createBtn('btnAgregar',el.btnAddTexto,'btn-primary');
			el.btnAgregar.prepend('<i class="fa fa-plus"></i> ');
		}
		if(el.grid){
			el.drawGrid();
		}
	}
	el.setTitulo = function(){
		el.idTitulo.append(el.titulo);
	}
	el.createBtn = function (nombreBoton,label,classColor){
		var btn = $('<div>');
		classColor = classColor ? classColor : 'btn-danger';
		btn.append(label);
		btn.addClass('btn');
		btn.addClass(classColor);
		el[nombreBoton] = btn;
		//console.log(el);
		el.idBotonera.append(btn);
	}
	el.setGrid = function (objeto){
		el.grid = objeto;
	}
	el.drawGrid = function(){
		el.work_area.empty();
		el.work_area.append(el.grid.$el);
	}
	el.dibujarFiltros = function(formFiltros,idFiltro,modulo){
/*		$('#filtro').empty();
		formFiltros.controles.forEach(
			function(object,key){
				//console.log(object,key)
			if(object.type == 'text'){
				el.dibujarInputText(object);
			}
		});*/
		//el.dibujarBtnFiltrar(idFiltro,modulo);
	}
	el.dibujarInputText = function(object){
			var input = $('<input>');
			input.attr('id',object.id);
			input.attr('name',object.name);
			input.attr('type','text');
			input.addClass('form-control col-lg-6');
			input.attr('placeholder',object.placeholder);
			//input.val(App.filtro);
			var col = $('<div class="col-lg-6">');
			col.append(input);
			$('#filtro').append(col);
	}
	el.dibujarBtnFiltrar = function(idFiltro,modulo){
			var btn = $('<a>');
			btn.addClass('btn btn-success');
			btn.append('Filtrar');
			$('#filtro').append(btn);
			btn.on('click',function(){
					//App.filtro = $('#filtro').serialize();
					var url = '#'+modulo+'/1/'+ App.filtro;
					$(btn).attr('href',url);
			});		
	}
	el.init(titulo,btnAdd,btnAddTexto,filtro);
	return el;	
}