<?php
use AppAlmacen\Repositories\UserRepo;

class UserController extends BaseController {
	protected $userRepo;
	public function __construct(UserRepo $userRepo){
		$this->userRepo =  $userRepo;
	}
	public function index()
	{
		return $this->userRepo->getList();
	}
	public function add(){
		return $this->userRepo->add();
	}
	public function update($id){
		//obtener id como parametro de la url
		return $this->userRepo->update($id);
	}
	public function delete($id){
		return $this->userRepo->delete($id);
	}
}