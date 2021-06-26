<?php
use AppAlmacen\Repositories\ProductoRepo;

class ProductoController extends BaseController {
	protected $productoRepo;
	public function __construct(ProductoRepo $productoRepo){
		$this->productoRepo =  $productoRepo;
	}
	public function all(){
		return $this->productoRepo->getAll();
	}
	public function index()
	{
		return $this->productoRepo->getList();
	}
	public function add(){
		return $this->productoRepo->add();
	}
	public function update($id){
		//obtener id como parametro de la url
		return $this->productoRepo->update($id);
	}
	public function delete($id){
		return $this->productoRepo->delete($id);
	}
}