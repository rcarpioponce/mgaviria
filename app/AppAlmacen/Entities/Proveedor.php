<?php
namespace AppAlmacen\Entities;
class Proveedor extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'proveedores';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('razon_social','ruc','web','descripcion');
	protected $hidden = array('created_at', 'updated_at');

}