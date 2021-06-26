<?php
namespace AppAlmacen\Entities;
class Stock extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'stock_productos';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('producto_id', 'cantidad_actual');
	protected $hidden = array('updated_at');

}