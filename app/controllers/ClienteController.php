<?php
use AppAlmacen\Repositories\ClienteRepo;

class ClienteController extends BaseController {
	protected $clienteRepo;
	public function __construct(ClienteRepo $clienteRepo){
		$this->clienteRepo =  $clienteRepo;
	}
	public function index()
	{
		return $this->clienteRepo->getList();
	}
	public function add(){
		return $this->clienteRepo->add();
	}
	public function update($id){
		return $this->clienteRepo->update($id);
	}
	public function delete($id){
		return $this->clienteRepo->delete($id);
	}
}