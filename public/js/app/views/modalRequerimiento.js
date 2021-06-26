var CModal = require('../classes/Cpopup.js');
var CollectProveedor = require('../collections/proveedor.js');
var GrequerimientoDetalle = require('../views/gridRequerimientoDetalle.js');
module.exports = Backbone.View.extend({
	className:'modal fade vistaModal',		
	initialize : function(modelo){
		var self = this;
		var contenido = $('#formRequerimiento').html();
		this.model = modelo;
		var id = this.model.get('id') ? ' ' + this.model.get('id') : ''; 
		var labelGuardar = id ? 'Aprobar requerimiento' : 'Guardar';
		if(this.model.get('estado') == 'aprobado'){
			labelGuardar = 'OK';
		}
		this.template = new CModal({titulo:'Datos de la orden' + id,
									contenidoHTML:contenido,tamano:'modal-lg',labelGuardar:labelGuardar});
		self.$el.attr('data-keyboard','false');
		self.$el.attr('data-backdrop','static');
		this.model.on('change',function(){
			self.model.determinarUrl();
		});
		this.render();		
	},
	addOneProveedor  : function(modelo){
		var option = $('<option>');
		option.val(modelo.get('id'));
		option.append(modelo.get('razon_social'));
		if(modelo.get('id') == this.model.get('proveedor_id')){
			option.attr('selected',true);
		}
		option.data(modelo.attributes);
		$('select.proveedor').append(option);		
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
			self.collectProveedor = new CollectProveedor();
			self.collectProveedor.on('add',function(model){self.addOneProveedor(model)});
			self.collectProveedor.url = App.root + '/proveedor/all';
			self.collectProveedor.fetch({
				success: function(){
					$(".proveedor").chosen();
				}
			});

			//se dibuja el detalle del requerimiento
			var idReq = self.model.get('id');
			var dibujarBtnAdd = idReq ? true : false;
			self.gridDetalle = new GrequerimientoDetalle({},dibujarBtnAdd,idReq);
			self.$el.find('.requerimiento_detalle').append(self.gridDetalle.$el);


/*			$("#FormularioRequerimiento").validate({
			  	submitHandler: function(form) {	
					var obj = {
						'nombre' : self.$el.find('.nombre').val(),
						'descripcion' : self.$el.find('.descripcion').val(),
						'precio_venta' : self.$el.find('.precio_venta').val(),
						'precio_base' : self.$el.find('.precio_base').val(),
						'precio_base' : self.$el.find('.precio_base').val(),
						'stock_minimo' : self.$el.find('.stock_minimo').val(),
						'stock_maximo' : self.$el.find('.stock_maximo').val(),
						'unidad_id' : self.$el.find('.unidad').val(),
						'categoria_id' : self.$el.find('.categoria').val(),
						'marca_id' : self.$el.find('.marca').val()
					};	  			
				}
			});*/
			$('.datepicker').datepicker({
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true,
                format: 'yyyy-mm-dd',
            });
			self.$el.find(".btnGuardar").on("click",function(){
					if(!self.model.get('id')){
						var obj = $('#FormularioRequerimiento').serializeObject();
						self.model.save(obj,{
							success: function(modelo_serv,response){
								//console.log('metodo save categoria',response,modelo_serv); 	
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
						if(self.model.get('estado') != 'aprobado'){							
							var obj = {estado : 'aprobado'};
							self.model.save(obj,{
								success: function(modelo_serv,response){
									//console.log('con id',modelo_serv,response);
									toastr.success(self.model.msgConfirmAprobado());
									self.quitarVentana();
								}
							});
						}else{
							self.quitarVentana();
						}
					}
			});
			self.$el.find(".proveedor").on("change",function(){
				var option = self.$el.find(".proveedor option:selected");
				var ruc = option.data('ruc');	
				var direccion = option.data('direccion');
				var telefono = option.data('telefono');
				var razon_social = option.data('razon_social');
				self.$el.find('.ruc').val(ruc);
				self.$el.find('.direccion').val(direccion);
				self.$el.find('.telefono').val(telefono);
				self.$el.find('.nombreProveedor').val(razon_social);
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