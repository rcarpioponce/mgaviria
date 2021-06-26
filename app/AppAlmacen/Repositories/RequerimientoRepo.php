<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\Requerimiento;
use AppAlmacen\Entities\RequerimientoDetalle;
use AppAlmacen\Entities\Stock;
use AppAlmacen\Entities\StockHistorial;
class RequerimientoRepo extends BaseRepo{
	public function getModel(){
		return new Requerimiento;
	}
	public function getList(){
		return Requerimiento::orderBy('id','desc')->paginate($this->numPaginate);
	}
	public function add(){
		$inputs = $this->getInputs();
		$this->model->ruc = $inputs['ruc'];
		$this->model->razon_social = $inputs['nombreProveedor'];
		$this->model->direccion = $inputs['direccion'];
		$this->model->telefono = $inputs['telefono'];
		$dt = date('Y-m-d H:i:s');		
		$this->model->fecha_pedido = $dt;
		$this->model->fecha_entrega = $inputs['fecha_entrega'];
		$this->model->monto_total = $inputs['monto_total'];
		$this->model->estado = 'por aprobar';
		$this->model->proveedor_id = $inputs['proveedor'];
		$this->model->user_id = 1;
		$this->model->save();
		$idReq = $this->model->id;

		$arProd = $inputs['idProducto'];
		$arNom = $inputs['nombreProducto'];
		$arUnidad = $inputs['unidad'];
		$arPxUnidad = $inputs['pxunidad'];
		$arCantidad = $inputs['cantidad'];
		$arSubtotal = $inputs['subtotal'];
		$numProd = count($arProd);
		$i = 0;
		for($i;$i<$numProd;$i++){
			$detalle = new RequerimientoDetalle();
			$detalle->nombre = $arNom[$i];
			$detalle->unidad = $arUnidad[$i];
			$detalle->cantidad = $arCantidad[$i];
			$detalle->costoxcantidad = $arPxUnidad[$i];
			$detalle->subtotal = $arSubtotal[$i];
			$detalle->producto_id = $arProd[$i];
			$detalle->requerimiento_id = $idReq;
			$detalle->save();
		}
		return $this->model;
	}
	public function update($id){
		$model = $this->model->find($id);
		$model->estado = 'aprobado';
		$model->save();

		$detalle = \DB::table('requerimientos_detalle')->where('requerimiento_id','=',$id)->get();
		foreach($detalle as $d){
			$idProducto = $d->producto_id;
			$entStock = \DB::table('stock_productos')->where('producto_id','=',$idProducto)->get();
			//dd($entStock);
			$cantidadHist = $entStock[0]->cantidad_actual + $d->cantidad;
			$fecha = date('Y-m-d');
			StockHistorial::create(['producto_id'=>$idProducto,'cantidad'=>$cantidadHist,'fecha_historia'=>$fecha]);				
			Stock::where('producto_id','=',$idProducto)->update(array('cantidad_actual' => $cantidadHist));
		}


		return $model;
	}
	public function delete($id){
		$model = $this->find($id);
		$model->delete();
		return $model;
	}
	public function find($id){
		$modelo =  $this->model->find($id);
		$detalle = \DB::table('requerimientos_detalle')->where('requerimiento_id','=',$id)->get();
		$modelo->detalle = $detalle;
		return $modelo;
	}
}