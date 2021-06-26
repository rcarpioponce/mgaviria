/*var appAlmacen = appAlmacen || {};
appAlmacen.urlBase = 'http://' + document.domain + 'mgaviria/public/home.html';
*/

window.$ = require('jquery');
$.noConflict(true);
window._ = require("underscore")
window.Backbone = require('backbone');
Backbone.$ = $;
/*Backbone.emulateHTTP = true;*/


window.App = {};
if(document.domain == 'localhost'){
	window.App.root = 'http://localhost/mgaviria/public';
}else{
	window.App.root = 'http://'+document.domain+'/marie_gaviria/public';
}
window.App.paginaCurrent = 1;
window.App.filtro = '';

window.gBanco = require('./views/gridBanco.js');
window.gLocal = require('./views/gridLocal.js');
window.gUnidad = require('./views/gridUnidad.js');
window.gCategoria = require('./views/gridCategoria.js');
window.gProducto = require('./views/gridProducto.js');
window.gProveedor = require('./views/gridProveedor.js');
window.gCliente = require('./views/gridCliente.js');
window.gUsuario = require('./views/gridUsuario.js');
window.gRequerimiento = require('./views//gridRequerimiento.js');
window.gRequerimientoInterno = require('./views/gridRequerimientoInterno.js');

window.cAjax = require('./classes/Cmodulo.js');
window.moduloReporte = require('./classes/CmoduloReporte.js');
window.fCategoria = require('./factories/categoria.js');
window.fProducto = require('./factories/producto.js');
window.fProveedor = require('./factories/proveedor.js');
window.fCliente = require('./factories/cliente.js');
window.fUsuario = require('./factories/usuario.js');

window.gridBanco;
window.gridLocal;
window.gridUnidad;
window.gridCategoria;
window.gridProducto;
window.gridProveedor;
window.gridCliente;
window.gridUsuario;
window.gridRequerimiento;
window.gridRequerimientoInterno;

var cModulo = require('./classes/Cmodulo.js');
var modalBanco  = require('./views/modalBanco.js');
var modalLocal  = require('./views/modalLocal.js');
var modalUnidad  = require('./views/modalUnidad.js');
var modalCategoria = require('./views/modalCategoria.js');
var modalProducto = require('./views//modalProducto.js');
var modalProveedor = require('./views//modalProveedor.js');
var modalCliente = require('./views//modalCliente.js');
var modalUsuario = require('./views/modalUsuario.js');
var modalRequerimiento = require('./views/modalRequerimiento.js');
var modalRequerimientoInterno = require('./views/modalRequerimientoInterno.js');

var Mcategoria = require('./models/categoria.js');
var Mbanco = require('./models/banco.js');
var Mlocal = require('./models/local.js');
var Munidad = require('./models/unidad.js');
var Mproducto = require('./models/producto.js');
var Mproveedor = require('./models/proveedor.js');
var Mcliente = require('./models/cliente.js');
var Musuario = require('./models/usuario.js');
var Mrequerimiento = require('./models/requerimiento.js');
var MrequerimientoInterno = require('./models/requerimientointerno.js');

var AppRouter = Backbone.Router.extend({
	routes: {
		"":"moduloBanco",
		"bancos" : "moduloBanco",
		"locales" : "moduloLocal",
		"unidades" : "moduloUnidades",
		"categorias/:page/(:filter)" : "moduloCategorias",
		"productos/:page/(:filter)" : "moduloProductos",
		"proveedores/:page/(:filter)" : "moduloProveedores",
		"clientes/:page/(:filter)" : "moduloClientes",
		"usuarios/:page/(:filter)": "moduloUsuarios",
		"requerimientos/:page/(:filter)": "moduloRequerimientos",		
		"requerimientosInterno/:page/(:filter)": "moduloRequerimientosInterno",
		"reporteLocal": "moduloReporteLocal"					
	},
	inicio: function(){
		console.log('inicio');
		//debemos crear un modulo de primera vista para el administrador y para el usuario en general
	},
	moduloReporteLocal: function(){
		var modulo = new moduloReporte();
	},
	moduloBanco: function(){
		gridBanco = new gBanco();
		gridBanco.render();
		var modulo = new cModulo('Entidades Bancarias',true,'Agregar banco');
		modulo.setGrid(gridBanco);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
				var modelo = new Mbanco();
				var modal = new modalBanco(modelo);
				modal.mostrar();   
		}); 		
	},
	moduloLocal: function(){
		gridLocal = new gLocal();
		gridLocal.render();
		var modulo = new cModulo('Locales',true,'Agregar local');
		modulo.setGrid(gridLocal);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
				var modelo = new Mlocal();
				var modal = new modalLocal(modelo);
				modal.mostrar();   
		}); 		
	},	
	moduloUnidades: function(){
		gridUnidad = new gUnidad();
		gridUnidad.render();
		var modulo = new cModulo('Unidades de Productos',true,'Agregar unidad');
		modulo.setGrid(gridUnidad);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
			var modelo = new Munidad();
			var modal = new modalUnidad(modelo);
			modal.mostrar();
		});		
	},
	moduloCategorias: function(page,filter){
		App.paginaCurrent = page ? parseInt(page) : 1;
		App.filtro = filter ? filter : '';
		gridCategoria = new gCategoria();
		gridCategoria.render();
		var modulo = new cModulo('Categorías de Productos',true,'Agregar categoría',true);
		modulo.setGrid(gridCategoria);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
			var modelo = new Mcategoria();
			var modal = new modalCategoria(modelo);
			modal.mostrar();
		});
		if(modulo.filtro){
			var formFiltros = {
				controles: [
					{
						id: 'nombreCategoria',
						name: 'nombre',
						type: 'text',
						placeholder: 'Buscar por nombre'
					},
				]
			};
			modulo.dibujarFiltros(formFiltros,'#nombreCategoria','categoria');
		}								
	},
	moduloProductos: function(page,filter){
		App.paginaCurrent = page ? parseInt(page) : 1;
		App.filtro = filter ? filter: '';
		gridProducto = new gProducto();
		gridProducto.render();
		var modulo = new cModulo('Productos',true,'Agregar producto',true);
		modulo.setGrid(gridProducto);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
			var modelo = new Mproducto();
			var modal = new modalProducto(modelo);
			modal.mostrar();
		});
		if(modulo.filtro){
			var formFiltros = {
				controles: [
					{
						id: 'nombreProducto',
						name: 'nombre',
						type: 'text',
						placeholder: 'Buscar por nombre'
					},
				]
			};
			modulo.dibujarFiltros(formFiltros,'#nombreProducto','producto');
		}		
	},
	moduloProveedores: function(page,filter){
		App.paginaCurrent = page ? parseInt(page) : 1;
		App.filtro = filter ? filter: '';
		gridProveedor = new gProveedor();
		gridProveedor.render();
		var modulo = new cModulo('Proveedores',true,'Agregar proveedor',true);
		modulo.setGrid(gridProveedor);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
			var modelo = new Mproveedor();
			var modal = new modalProveedor(modelo);
			modal.mostrar();
		});		
	},
	moduloClientes: function(page,filter){
		App.paginaCurrent = page ? parseInt(page) : 1;
		App.filtro = filter ? filter: '';
		gridCliente = new gCliente();
		gridCliente.render();
		var modulo = new cModulo('Clientes',true,'Agregar cliente',true);
		modulo.setGrid(gridCliente);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
			var modelo = new Mcliente();
			var modal = new modalCliente(modelo);
			modal.mostrar();
		});		
	},
	moduloUsuarios: function(page,filter){
		gridUsuario = new gUsuario();
		gridUsuario.render();
		var modulo = new cModulo('Usuarios',true,'Agregar usuario');
		modulo.setGrid(gridUsuario);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
			var modelo = new Musuario();
			var modal = new modalUsuario(modelo);
			modal.mostrar();
		});		
	},
	moduloRequerimientos: function(page,filter){
		gridRequerimiento = new gRequerimiento();
		gridRequerimiento.render();
		var modulo = new cModulo('Ordenes de compra',true,'Agregar orden');
		modulo.setGrid(gridRequerimiento);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
			var modelo = new Mrequerimiento();
			var modal = new modalRequerimiento(modelo);
			modal.mostrar();
		});		
	},
	moduloRequerimientosInterno: function(page,filter){
		gridRequerimiento = new gRequerimientoInterno();
		gridRequerimiento.render();
		var modulo = new cModulo('Registro de Salidas',true,'Agregar salida');
		modulo.setGrid(gridRequerimiento);
		modulo.dibujar();
		$(modulo.btnAgregar).on('click',function(){
			var modelo = new MrequerimientoInterno();
			var modal = new modalRequerimientoInterno(modelo);
			modal.mostrar();
		});		
	},			
});

$(document).ready(function () {
	$('form#filtro').on('submit',function(event){
		event.preventDefault();
	});

    router = new AppRouter();
    Backbone.history.start();
});