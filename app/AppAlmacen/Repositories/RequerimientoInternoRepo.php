<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\RequerimientoInterno;
use AppAlmacen\Entities\RequerimientoInternoDetalle;
use AppAlmacen\Entities\Stock;
use AppAlmacen\Entities\StockHistorial;
class RequerimientoInternoRepo extends BaseRepo{
	public function getModel(){
		return new RequerimientoInterno;
	}
	public function getList(){
		return \DB::table('requerimientos_interno')
				->join('locales','requerimientos_interno.local_id','=','locales.id')
				->select('requerimientos_interno.*',\DB::raw('mg_locales.nombre as local'))
				->orderBy('requerimientos_interno.id','desc')
				->paginate($this->numPaginate);
		//return RequerimientoInterno::all();
	}
	public function add(){
		$inputs = $this->getInputs();
		$this->model->local_id = $inputs['local_id'];
		$this->model->user_id = 1;
		$this->model->estado = $inputs['estado'];
		$this->model->save();
		$idReq = $this->model->id;

		$arProd = $inputs['idProducto'];
		$arNom = $inputs['nombreProducto'];
		$arUnidad = $inputs['unidad'];
		$arCantidad = $inputs['cantidad'];
		$numProd = count($arProd);
		$i = 0;
		for($i;$i<$numProd;$i++){
			$detalle = new RequerimientoInternoDetalle();
			$detalle->nombre = $arNom[$i];
			$detalle->unidad = $arUnidad[$i];
			$detalle->cantidad = $arCantidad[$i];
			$detalle->producto_id = $arProd[$i];
			$detalle->requerimiento_id = $idReq;
			$detalle->save();
		}
		$local = \DB::table('locales')->where('id','=',$inputs['local_id'])->get();
		$this->model->local = $local[0]->nombre;

		return $this->model;
	}
	public function update($id){
		$model = $this->model->find($id);
		$model->estado = 'aprobado';

		$detalle = \DB::table('requerimientos_interno_detalle')->where('requerimiento_id','=',$id)->get();
		foreach($detalle as $d){
			$idProducto = $d->producto_id;
			$entStock = \DB::table('stock_productos')->where('producto_id','=',$idProducto)->get();
			$cantidadHist = $entStock[0]->cantidad_actual - $d->cantidad;
			$fecha = date('Y-m-d');
			StockHistorial::create(['producto_id'=>$idProducto,'cantidad'=>$cantidadHist,'fecha_historia'=>$fecha]);				
			Stock::where('producto_id','=',$idProducto)->update(array('cantidad_actual' => $cantidadHist));
		}

		$model->save();

		$local = \DB::table('locales')->where('id','=',$model->local_id)->get();
		$this->model->local = $local[0]->nombre;
		return $model;
	}
	public function delete($id){
		$model = $this->find($id);
		$model->delete();
		return $model;
	}
	public function find($id){
		$modelo =  $this->model->find($id);
		$modelo->aprobar = $modelo->estado == 'aprobado' ? 0 : 1;
		$detalle = \DB::table('requerimientos_interno_detalle')
					->join('stock_productos','requerimientos_interno_detalle.producto_id','=','stock_productos.producto_id')
					->select('requerimientos_interno_detalle.*',\DB::raw('IF(mg_stock_productos.cantidad_actual -  mg_requerimientos_interno_detalle.cantidad < 0,"stock no disponible","") as observacion'))
					->where('requerimientos_interno_detalle.requerimiento_id','=',$id)
					->groupBy('requerimientos_interno_detalle.id')
					->get();
		foreach($detalle as $dt){
			$observacion = trim($dt->observacion);
			if(strlen($observacion) > 0){
				$modelo->aprobar = 0;
				break;
			}
		}
		$modelo->detalle = $detalle;
		return $modelo;
	}
}