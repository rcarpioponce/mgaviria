<?php
use AppAlmacen\Repositories\BancoRepo;

class BancoController extends BaseController {
	protected $bancoRepo;
	public function __construct(BancoRepo $bancoRepo){
		$this->bancoRepo =  $bancoRepo;
	}
	public function index()
	{
		return $this->bancoRepo->getList();
	}
	public function add(){
		return $this->bancoRepo->add();
	}
	public function update($id){
		//obtener id como parametro de la url
		return $this->bancoRepo->update($id);
	}
	public function delete($id){
		return $this->bancoRepo->delete($id);
	}
}