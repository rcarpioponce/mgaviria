<?php
use AppAlmacen\Repositories\RequerimientoInternoRepo;

class RequerimientoInternoController extends BaseController {
	protected $requerimientoRepo;
	public function __construct(RequerimientoInternoRepo $requerimientoRepo){
		$this->requerimientoRepo =  $requerimientoRepo;
	}
	public function index(){
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