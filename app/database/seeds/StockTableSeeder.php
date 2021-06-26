<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;
use AppAlmacen\Entities\Stock;
use AppAlmacen\Entities\StockHistorial;
class StockTableSeeder extends Seeder {

	public function run()
	{
		$cantidad = 0;
		foreach(range(1, 57) as $index)
		{
			$idProducto = $index;
			$stock = Stock::create(['producto_id'=>$idProducto,'cantidad_actual'=>$cantidad]);
			$fecha = $stock->created_at;
			StockHistorial::create(['producto_id'=>$idProducto,'cantidad'=>$cantidad,'fecha_historia'=>$fecha]);
		}			
	}

}