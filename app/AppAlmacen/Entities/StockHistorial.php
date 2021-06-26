<?php
namespace AppAlmacen\Entities;
class StockHistorial extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'stock_historial';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('producto_id', 'cantidad','fecha_historia');
	protected $hidden = array('created_at', 'updated_at');

}