<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProveedorCtasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('proveedor_ctas', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('nro_cta');
			$table->enum('tipo',['normal','interbancario']);
			$table->integer('banco_id')->unsigned();
			$table->integer('proveedor_id')->unsigned();
			$table->foreign('proveedor_id')->references('id')->on('proveedores');			
			$table->foreign('banco_id')->references('id')->on('bancos');			
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('proveedor_ctas');
	}

}
