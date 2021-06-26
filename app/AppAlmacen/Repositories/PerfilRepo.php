<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\Perfil;
class PerfilRepo extends BaseRepo{
	public function getModel(){
		return new Perfil;
	}
	public function getList(){
		return Perfil::all();
	}
	public function add(){
		$inputs = $this->getInputs();
		$this->model->nombre = $inputs['nombre'];
		$this->model->descripcion = $inputs['descripcion'];
		$this->model->estado = $inputs['estado'];
		$this->model->save();
		return $this->model;
	}
	public function update($id){
		$model = $this->find($id);
		$inputs = $this->getInputs();
		$model->nombre = $inputs['nombre'];
		$model->descripcion = $inputs['descripcion'];
		$model->estado = $inputs['estado'];
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