<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\Local;
class LocalRepo extends BaseRepo{
	public function getModel(){
		return new Local;
	}
	public function getList(){
		return Local::all();
	}
	public function add(){
		$inputs = $this->getInputs();
		$this->model->nombre = $inputs['nombre'];
		$this->model->estado = $inputs['estado'];
		$this->model->save();
		return $this->model;
	}
	public function update($id){
		$model = $this->find($id);
		$inputs = $this->getInputs();
		$model->nombre = $inputs['nombre'];
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