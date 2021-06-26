<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProductosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('productos', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('nombre');
			$table->text('descripcion');
			$table->double('precio_venta');
			$table->double('precio_base');
			$table->double('stock_minimo');
			$table->double('stock_maximo');
			$table->integer('categoria_id')->unsigned();
			$table->integer('unidad_id')->unsigned();
			$table->foreign('categoria_id')->references('id')->on('categorias');
			$table->foreign('unidad_id')->references('id')->on('unidades');
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
		Schema::drop('productos');
	}

}
