<?php

// Composer: "fzaninotto/faker": "v1.3.0"
//use Faker\Factory as Faker;
use AppAlmacen\Entities\Proveedor;
class ProveedoresTableSeeder extends Seeder {

	public function run()
	{
		
		foreach(range(1, 40) as $index)
		{
			$nombre = 'proveedor_'.$index;
			$ruc = abs(rand(10451573719,20451573719));
			$web = 'www.proveedor_'.$index.'.com';
			Proveedor::create([
				'razon_social'=>$nombre,
				'ruc'=>$ruc,
				'web'=>$web,
				'descripcion'=> 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias provident itaque reprehenderit laudantium accusamus officiis unde, ducimus dolorem quas, debitis inventore aliquid ipsum, veniam dolore et voluptates, culpa saepe. Vel? '.$index,
			]);
		}
	}

}