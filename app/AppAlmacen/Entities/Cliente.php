<?php
namespace AppAlmacen\Entities;
class Cliente extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'clientes';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('razon_social','tipo_doc','num_doc','dir_domicilio','web','descripcion');
	protected $hidden = array('created_at', 'updated_at');

}