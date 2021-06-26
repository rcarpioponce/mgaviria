<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\Cliente;
class ClienteRepo extends BaseRepo{
	public function getModel(){
		return new Cliente;
	}
	public function getList(){
		return Cliente::orderBy('id','desc')->paginate($this->numPaginate);
	}
	public function add(){
		$inputs = $this->getInputs();
		$this->model->razon_social = $inputs['razon_social'];
		$this->model->tipo_doc = $inputs['tipo_doc'];
		$this->model->num_doc = $inputs['num_doc'];
		$this->model->dir_domicilio = $inputs['dir_domicilio'];
		$this->model->web = $inputs['web'];
		$this->model->descripcion = $inputs['descripcion'];
		$this->model->save();
		return $this->model;
	}
	public function update($id){
		$model = $this->find($id);
		$inputs = $this->getInputs();
		$model->razon_social = $inputs['razon_social'];
		$model->tipo_doc = $inputs['tipo_doc'];
		$this->model->num_doc = $inputs['num_doc'];
		$this->model->dir_domicilio = $inputs['dir_domicilio'];
		$this->model->web = $inputs['web'];
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