<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableProveedorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('proveedores', function(Blueprint $table)
		{
/*			$table->string('direccion');
			$table->string('telefono');
			$table->string('correo');
			$table->string('nro_cta');
			$table->string('contacto');			
			$table->enum('tipo_moneda',['soles','dolares']);*/
			$table->integer('banco_id')->unsigned();
			$table->foreign('banco_id')->references('id')->on('bancos');			
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
