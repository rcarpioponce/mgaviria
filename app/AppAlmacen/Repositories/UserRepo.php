<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\User;
class UserRepo extends BaseRepo{
	public function getModel(){
		return new User;
	}
	public function getList(){
		//return User::join()::paginate($this->numPaginate);
		return \DB::Table('users')->join('perfiles','users.perfil_id','=','perfiles.id')
									->select('users.*','perfiles.nombre AS perfil')
									->paginate($this->numPaginate);
	}
	public function add(){
		$inputs = $this->getInputs();
		$this->model->nombres = $inputs['nombres'];
		$this->model->apellidos = $inputs['apellidos'];
		$this->model->dni = $inputs['dni'];
		$this->model->direccion = $inputs['direccion'];
		$this->model->email = $inputs['email'];
		$this->model->password = \Hash::make($inputs['password']);
		$this->model->perfil_id = $inputs['perfil_id'];
		$this->model->save();
		return $this->model;
	}
	public function update($id){
		$model = $this->find($id);
		$inputs = $this->getInputs();
		$model->nombres = $inputs['nombres'];
		$model->apellidos = $inputs['apellidos'];
		$model->dni = $inputs['dni'];
		$model->direccion = $inputs['direccion'];
		$model->email = $inputs['email'];
		$model->password = \Hash::make($inputs['password']);
		$model->perfil_id = $inputs['perfil_id'];
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