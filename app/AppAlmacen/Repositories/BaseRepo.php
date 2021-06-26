<?php
namespace AppAlmacen\Repositories;
abstract class BaseRepo{
	protected $model;
	public $inputs;
	public function __construct(){
		$this->model = $this->getModel();
		$this->numPaginate = 10;
	}
	abstract function getModel();
	abstract function add();
	public function find($id){
		return $this->model->find($id);
	}
	public function getInputs(){
		return \Input::all();
	}
} 