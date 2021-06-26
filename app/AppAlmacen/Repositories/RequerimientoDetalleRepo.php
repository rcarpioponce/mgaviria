<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\RequerimientoDetalle;
class RequerimientoDetalleRepo extends BaseRepo{
	public function getModel(){
		return new RequerimientoDetalle;
	}
	public function getList(){

	}
	public function add($inputs){
		//dd($inputs);
		$this->model->nombre = $inputs['nombre'];
		$this->model->unidad = $inputs['unidad'];
		$this->model->cantidad = $inputs['cantidad'];
		$this->model->costoxcantidad = $inputs['costoxcantidad'];
		$this->model->subtotal = $inputs['subtotal'];
		$this->model->producto_id = $inputs['producto_id'];
		$this->model->save();
	}
	public function find($id){
		return $this->model->find($id);
	}
}