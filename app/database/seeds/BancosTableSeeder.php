<?php

// Composer: "fzaninotto/faker": "v1.3.0"
//use Faker\Factory as Faker;
use AppAlmacen\Entities\Banco;
class BancosTableSeeder extends Seeder {

	public function run()
	{
		Banco::create(['nombre'=>'BBVA Continental','estado'=>'activo']);
		Banco::create(['nombre'=>'BCP','estado'=>'activo']);
		Banco::create(['nombre'=>'Scotiabank','estado'=>'activo']);
		/*$faker = Faker::create();

		foreach(range(1, 10) as $index)
		{
			Banco::create([

			]);
		}*/
	}

}