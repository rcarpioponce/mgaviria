<?php
use AppAlmacen\Repositories\CategoriaRepo;

class CategoriaController extends BaseController {
	protected $CategoriaRepo;
	public function __construct(CategoriaRepo $categoriaRepo){
		$this->categoriaRepo =  $categoriaRepo;
	}
	public function all(){
		return $this->categoriaRepo->getAll();
	}
	public function index()
	{
		return $this->categoriaRepo->getList();
	}
	public function add(){
		return $this->categoriaRepo->add();
	}
	public function update($id){
		//obtener id como parametro de la url
		return $this->categoriaRepo->update($id);
	}
	public function delete($id){
		return $this->categoriaRepo->delete($id);
	}
}