var CModal = require('../classes/Cpopup.js');
var CollectLocal = require('../collections/local.js');
var GrequerimientoDetalle = require('../views/gridRequerimientoInternoDetalle.js');
module.exports = Backbone.View.extend({
	className:'modal fade vistaModal',		
	initialize : function(modelo){
		var self = this;
		var contenido = $('#formRequerimientoInterno').html();
		this.model = modelo;
		var id = this.model.get('id') ? ' ' + this.model.get('id') : ''; 
		var labelGuardar = this.model.get('estado') == 'pendiente' ? 'Aprobar salida' : 'Guardar';
		this.template = new CModal({titulo:'Datos de la salida' + id,
									contenidoHTML:contenido,tamano:'modal-lg',labelGuardar:labelGuardar});
		self.$el.attr('data-keyboard','false');
		self.$el.attr('data-backdrop','static');
		this.model.on('change',function(){
			self.model.determinarUrl();
		});
		this.render();		
	},
	addOneLocal  : function(modelo){
		var option = $('<option>');
		option.val(modelo.get('id'));
		option.append(modelo.get('nombre'));
		if(modelo.get('id') == this.model.get('local_id')){
			option.attr('selected',true);
		}
		option.data(modelo.attributes);
		$('select.local').append(option);		
	},		
	mostrar:function(){
		var self = this;
		if(this.model.get('control') === false ){
			this.$el.modal({keyboard: false,
    		backdrop: false});	
		}
		else{
			self.$el.modal('toggle');
		}
		this.$el.on('hidden.bs.modal',function(){
			self.quitarVentana();
		});
		this.$el.on('shown.bs.modal',function(){
			self.collectLocal = new CollectLocal();
			self.collectLocal.on('add',function(model){self.addOneLocal(model)});
			self.collectLocal.fetch({
				success: function(){
					$("select.local").chosen();
				}
			});

			//se dibuja el detalle del requerimiento
			var idReq = self.model.get('id');
			var dibujarBtnAdd = idReq ? true : false;
			self.gridDetalle = new GrequerimientoDetalle({},dibujarBtnAdd,idReq);
			self.$el.find('.requerimiento_detalle').append(self.gridDetalle.$el);
			
			if(typeof(self.gridDetalle.ajax) != 'undefined'){
				self.gridDetalle.ajax.on('complete',function(){
					var aprobar = self.gridDetalle.ajax.data.aprobar;
					self.$el.find(".btnGuardar").on("click",function(){
						if(!self.model.get('id')){
							var obj = $('#FormularioRequerimientoInterno').serializeObject();
							self.model.save(obj,{
								success: function(modelo_serv,response){
									if(!modelo_serv._previousAttributes.id){
										gridRequerimiento.addOneFirst(modelo_serv);
										toastr.success(self.model.msgConfirmAgregar());
									}else{
										toastr.success(self.model.msgConfirmEditar());
									}
									self.quitarVentana();
								}
							});									
						}else{
							if(parseInt(aprobar) == 1){ //0: no se puede aprobar y uno 1: se puede aprobar
								var obj = {estado : 'aprobado'};
								self.model.save(obj,{
									success: function(modelo_serv,response){
										toastr.success(self.model.msgConfirmAprobado());
										self.quitarVentana();
									}
								});
							}else{
								if(self.model.get('estado') == 'pendiente'){
									toastr.warning('No puedes aprobar esta salida porque no hay stock suficiente','Salida');
								}
								self.quitarVentana();
							}
						}
				});				
				});
			}

			if(!self.model.get('id')){
				self.$el.find(".btnGuardar").on("click",function(){
						var obj = $('#FormularioRequerimientoInterno').serializeObject();
						self.model.save(obj,{
							success: function(modelo_serv,response){
								if(!modelo_serv._previousAttributes.id){
									gridRequerimiento.addOneFirst(modelo_serv);
									toastr.success(self.model.msgConfirmAgregar());
								}else{
									toastr.success(self.model.msgConfirmEditar());
								}
								self.quitarVentana();
							}
						});
				});															
			}
			//console.log('gridDetalle',self.gridDetalle);
			//self.model.set('aprobado',self.gridDetalle.aprobar);
			//console.log(self.gridDetalle.aprobar,' self aprobado ', self.model.get('aprobado'));
			$('.datepicker').datepicker({
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true,
                format: 'yyyy-mm-dd',
            });
		});
	},			
	quitarVentana:function(){
		var self = this;	
		self.$el.modal('hide');
   		setTimeout(function(){
   			self.$el.remove();	
   		},1000);
	},	
	render: function() {
		var self = this;
		this.template = _.template(this.template.template,this.model.toJSON());
		this.$el.html(this.template);
		if(this.model.get('control') === false ){
			this.$el.find('.btnControl').hide();
		}
		return this;
	}
});