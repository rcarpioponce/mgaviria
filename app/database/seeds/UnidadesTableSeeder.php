<?php

// Composer: "fzaninotto/faker": "v1.3.0"
//use Faker\Factory as Faker;
use AppAlmacen\Entities\Unidad;
class UnidadesTableSeeder extends Seeder {

	public function run()
	{
		Unidad::create(['nombre'=>'unidad','estado'=>'activo']);
		Unidad::create(['nombre'=>'metro','estado'=>'activo']);
		Unidad::create(['nombre'=>'caja','estado'=>'activo']);		
		//$faker = Faker::create();
	}

}