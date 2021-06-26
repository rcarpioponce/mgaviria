<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\Categoria;
class CategoriaRepo extends BaseRepo{
	public function getModel(){
		return new Categoria;
	}
	public function getAll(){
		return Categoria::all();
	}
	public function getList(){
		$inputs = $this->getInputs();
		$inputs['nombre'] = isset($inputs['nombre']) ? $inputs['nombre'] : ''; 
		$nombre = '%'.$inputs['nombre'].'%';
		return Categoria::where('nombre','LIKE',$nombre)->orderBy('id','desc')->paginate($this->numPaginate); //ejemplo para paginar
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
	//falta opcion borrar
	public function delete($id){
		$model = $this->find($id);
		$model->delete();
		return $model;
	}
	public function find($id){
		return $this->model->find($id);
	}
}