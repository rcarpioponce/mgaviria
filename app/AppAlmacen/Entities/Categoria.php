<?php
namespace AppAlmacen\Entities;
class Categoria extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'categorias';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('nombre','estado');
	//protected $hidden = array('password', 'remember_token');

}