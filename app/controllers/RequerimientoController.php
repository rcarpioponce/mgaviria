<?php
use AppAlmacen\Repositories\RequerimientoRepo;

class RequerimientoController extends BaseController {
	protected $requerimientoRepo;
	public function __construct(RequerimientoRepo $requerimientoRepo){
		$this->requerimientoRepo =  $requerimientoRepo;
	}
	public function index()
	{
		return $this->requerimientoRepo->getList();
	}
	public function add(){
		return $this->requerimientoRepo->add();
	}
	public function update($id){
		return $this->requerimientoRepo->update($id);
	}
	public function delete($id){
		return $this->requerimientoRepo->delete($id);
	}
	public function find($id){
		return $this->requerimientoRepo->find($id);
	}
}