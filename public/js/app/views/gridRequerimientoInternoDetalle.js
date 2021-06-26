var Mgrid = require('../models/grid.js');
var VrowRequerimientoDetalle = require('../views/rowRequerimientoInternoDetalle.js');
var MrequerimientoDetalle = require('../models/requerimientointernodetalle.js');
var Cajax = require('../classes/Cajax.js');
module.exports = Backbone.View.extend({
	initialize: function(modelo,dibujarBtnAdd,idRequerimiento){
		var self = this;
		var btn = !idRequerimiento ? this.dibujarBtnAdd() : '';
		this.templateHtml = btn + $('#table').html();
		this.clase = 'gridRequerimientoDetalleInterno';
		this.claseSelector = '.' + this.clase;
		this.idRequerimiento = idRequerimiento ? idRequerimiento : false;
		var object = {
			cabecera: ['Producto','Unidad','Cantidad','Observación','Acciones'],
			clase: this.clase
		};
		if(this.idRequerimiento){
			object.cabecera.pop();
		}
		this.model = new Mgrid(object);
		this.render();
		if(this.idRequerimiento){
			this.ajax = new Cajax(App.root + '/requerimiento_interno/' + idRequerimiento);
			this.ajax.on('complete',function(){
				var row,modelo,i;
				for(i=0;i<self.ajax.data.detalle.length;i++){
					modelo = new MrequerimientoDetalle(self.ajax.data.detalle[i]);
					row = new VrowRequerimientoDetalle(modelo);					
					self.$el.find('.gridRequerimientoDetalleInterno').append(row.$el);
				}
			});
			this.ajax.execute();
		}


		var self = this;
		this.$el.find('.btnAdd').on('click',function(){
			modelo = new MrequerimientoDetalle();
			var row = new VrowRequerimientoDetalle(modelo);
			self.$el.find('.gridRequerimientoDetalleInterno').append(row.$el);
		});
	},
	dibujarBtnAdd: function(){
		var row = $('<div class="row text-right">');
		var btn = $('<div class="btn btn-primary btnAdd">');
		btn.append('Agregar Item');
		row.append(btn);
		return row.html();
	},
	render: function(){
		this.template = _.template(this.templateHtml,this.model.toJSON());
		this.$el.html(this.template);
		this.grid = this.$el.find(this.claseSelector);
		return this;
	}
});