<?php
use AppAlmacen\Repositories\ProveedorRepo;

class ProveedorController extends BaseController {
	protected $proveedorRepo;
	public function __construct(ProveedorRepo $proveedorRepo){
		$this->proveedorRepo =  $proveedorRepo;
	}
	public function all(){
		return $this->proveedorRepo->getAll();
	}	
	public function index()
	{
		return $this->proveedorRepo->getList();
	}
	public function add(){
		return $this->proveedorRepo->add();
	}
	public function update($id){
		return $this->proveedorRepo->update($id);
	}
	public function delete($id){
		return $this->proveedorRepo->delete($id);
	}
}