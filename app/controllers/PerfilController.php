<?php
use AppAlmacen\Repositories\PerfilRepo;

class PerfilController extends BaseController {
	protected $perfilRepo;
	public function __construct(PerfilRepo $perfilRepo){
		$this->perfilRepo =  $perfilRepo;
	}
	public function index()
	{
		return $this->perfilRepo->getList();
	}
	public function add(){
		return $this->perfilRepo->add();
	}
	public function update($id){
		return $this->perfilRepo->update($id);
	}
	public function delete($id){
		return $this->perfilRepo->delete($id);
	}
}