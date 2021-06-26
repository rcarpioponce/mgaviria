<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\Proveedor;
class ProveedorRepo extends BaseRepo{
	public function getModel(){
		return new Proveedor;
	}
	public function getAll(){
		return Proveedor::all();
	}
	public function getList(){
		return Proveedor::orderBy('id','desc')->paginate($this->numPaginate);
	}
	public function add(){
		$inputs = $this->getInputs();
		$this->model->ruc = $inputs['ruc'];
		$this->model->razon_social = $inputs['razon_social'];
		$this->model->direccion = $inputs['direccion'];
		$this->model->web = $inputs['web'];
		$this->model->banco_id = $inputs['banco_id'];
		$this->model->tipo_moneda = $inputs['tipo_moneda'];
		$this->model->nro_cta = $inputs['nro_cta'];
		$this->model->telefono = $inputs['telefono'];
		$this->model->correo = $inputs['correo'];
		$this->model->contacto = $inputs['contacto'];
		$this->model->descripcion = $inputs['descripcion'];
		$this->model->save();
		return $this->model;
	}
	public function update($id){
		$model = $this->find($id);
		$inputs = $this->getInputs();
		$model->ruc = $inputs['ruc'];
		$model->razon_social = $inputs['razon_social'];
		$model->direccion = $inputs['direccion'];
		$model->web = $inputs['web'];
		$model->banco_id = $inputs['banco_id'];
		$model->tipo_moneda = $inputs['tipo_moneda'];
		$model->nro_cta = $inputs['nro_cta'];
		$model->telefono = $inputs['telefono'];
		$model->correo = $inputs['correo'];
		$model->contacto = $inputs['contacto'];
		$model->descripcion = $inputs['descripcion'];
		$model->save();
		return $model;
	}
	public function delete($id){
		$model = $this->find($id);
		$model->delete();
		return $model;
	}
	public function find($id){
		return $this->model->find($id);
	}
}