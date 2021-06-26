<?php
use AppAlmacen\Repositories\UnidadRepo;

class UnidadController extends BaseController {
	protected $unidadRepo;
	public function __construct(UnidadRepo $unidadRepo){
		$this->unidadRepo =  $unidadRepo;
	}
	public function index()
	{
		return $this->unidadRepo->getList();
	}
	public function add(){
		return $this->unidadRepo->add();
	}
	public function update($id){
		//obtener id como parametro de la url
		return $this->unidadRepo->update($id);
	}
	public function delete($id){
		return $this->unidadRepo->delete($id);
	}
}