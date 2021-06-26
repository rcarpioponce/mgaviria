<?php
namespace AppAlmacen\Entities;
class Producto extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'productos';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('nombre','descripcion','precio_venta','precio_base','stock_minimo','stock_maximo','categoria_id','unidad_id');
	protected $hidden = array('created_at', 'updated_at');

}