<?php

// Composer: "fzaninotto/faker": "v1.3.0"
//use Faker\Factory as Faker;
use AppAlmacen\Entities\Perfil;
class PerfilesTableSeeder extends Seeder {
	public function run()
	{
		Perfil::create(['nombre'=>'administrador','estado'=>'activo']);
		Perfil::create(['nombre'=>'usuario','estado'=>'activo']);
	}

}