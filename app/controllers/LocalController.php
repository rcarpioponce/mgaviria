<?php
use AppAlmacen\Repositories\LocalRepo;

class LocalController extends BaseController {
	protected $localRepo;
	public function __construct(LocalRepo $localRepo){
		$this->localRepo =  $localRepo;
	}
	public function index(){
		return $this->localRepo->getList();
	}
	public function add(){
		return $this->localRepo->add();
	}
	public function update($id){
		//obtener id como parametro de la url
		return $this->localRepo->update($id);
	}
	public function delete($id){
		return $this->localRepo->delete($id);
	}
}