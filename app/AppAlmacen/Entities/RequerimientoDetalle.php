<?php
namespace AppAlmacen\Entities;
class RequerimientoDetalle extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'requerimientos_detalle';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('requerimiento_id','producto_id','nombre','unidad','cantidad','costoxunidad','subtotal');
	protected $hidden = array('created_at', 'updated_at');
}