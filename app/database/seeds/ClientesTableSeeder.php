<?php

// Composer: "fzaninotto/faker": "v1.3.0"
//use Faker\Factory as Faker;
use AppAlmacen\Entities\Cliente;
class ClientesTableSeeder extends Seeder {

	public function run()
	{
		
		foreach(range(1, 40) as $index)
		{
			$nombre = 'cliente_'.$index;
			$nro_doc = abs(rand(45157371,99999999));
			$web = 'www.cliente_'.$index.'.com';
			Cliente::create([
				'razon_social'=>$nombre,
				'tipo_doc'=>'dni',
				'num_doc'=>$nro_doc,
				'web'=>$web,
				'dir_domicilio'=>'direccion nro'.$index,
				'descripcion'=> 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias provident itaque reprehenderit laudantium accusamus officiis unde, ducimus dolorem quas, debitis inventore aliquid ipsum, veniam dolore et voluptates, culpa saepe. Vel? '.$index,
			]);
		}
	}

}