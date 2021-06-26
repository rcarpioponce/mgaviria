<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\RequerimientoInterno;
use AppAlmacen\Entities\RequerimientoInternoDetalle;
use AppAlmacen\Entities\Stock;
use AppAlmacen\Entities\StockHistorial;
class ReporteRepo extends BaseRepo{
	public function getModel(){
		return new RequerimientoInterno;
	}
	public function getList(){
		$ar = RequerimientoInterno::where('estado','=','aprobado')->get();
		foreach ($ar as $v) {
			print_r($v);
			echo '<br>';
			echo '<br>';
			echo '<br>';
			echo '<br>';
		}
	}
	public function add(){}
}