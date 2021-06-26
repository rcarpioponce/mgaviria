<?php

// Composer: "fzaninotto/faker": "v1.3.0"
//use Faker\Factory as Faker;
use AppAlmacen\Entities\Producto;
class ProductosTableSeeder extends Seeder {

	public function run()
	{
		
		foreach(range(1, 40) as $index)
		{
			$nombre = 'producto_'.$index;
			$categoria = rand(1,4);
			Producto::create([
				'nombre'=>$nombre,
				'descripcion'=>'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias provident itaque reprehenderit laudantium accusamus officiis unde, ducimus dolorem quas, debitis inventore aliquid ipsum, veniam dolore et voluptates, culpa saepe. Vel? '.$index,
				'precio_venta'=>$index * 10,
				'precio_base'=>$index * 5,
				'stock_minimo'=>5,
				'stock_maximo'=>100,
				'categoria_id'=>$categoria,
				'unidad_id'=>1
			]);
		}
	}

}