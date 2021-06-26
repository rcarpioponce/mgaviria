<?php
namespace AppAlmacen\Entities;
class RequerimientoInterno extends \Eloquent {
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'requerimientos_interno';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $fillable = array('local_id','user_id');
	protected $hidden = array('updated_at');

}