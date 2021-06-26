<?php
namespace AppAlmacen\Entities;
class Requerimiento extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'requerimientos';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('proveedor_id','user_id','razon_social','ruc','direccion','telefono','fecha_pedido','fecha_entrega','estado','monto_total');
	protected $hidden = array('created_at', 'updated_at');

}