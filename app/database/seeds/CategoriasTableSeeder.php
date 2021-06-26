<?php

// Composer: "fzaninotto/faker": "v1.3.0"
//use Faker\Factory as Faker;
use AppAlmacen\Entities\Categoria;
class CategoriasTableSeeder extends Seeder {

	public function run()
	{
		
		foreach(range(1, 40) as $index)
		{
			$nombre = 'categoria_'.$index;
			Categoria::create(['nombre'=>$nombre,'estado'=>'activo']);
		}
	}

}