<?php
namespace AppAlmacen\Entities;
class RequerimientoInternoDetalle extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'requerimientos_interno_detalle';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('requerimiento_id','producto_id','nombre','unidad','cantidad');
	protected $hidden = array('updated_at');
}