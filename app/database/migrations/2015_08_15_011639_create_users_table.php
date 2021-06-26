<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('nombres');
			$table->string('apellidos');
			$table->string('dni');
			$table->string('direccion');
			$table->string('email');
			$table->string('password');
			$table->string('remember_token')->nullable();
			$table->date('fecha_ini_lab'); //fecha de inicio de labores
			$table->date('fecha_nac'); //fecha de nacimiento
			$table->integer('perfil_id')->unsigned();
			$table->foreign('perfil_id')->references('id')->on('perfiles');
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
		Schema::drop('users');
	}

}
