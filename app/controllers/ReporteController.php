<?php
use AppAlmacen\Repositories\ReporteRepo;

class ReporteController extends BaseController {
	protected $requerimientoRepo;
	public function __construct(ReporteRepo $requerimientoRepo){
		$this->requerimientoRepo =  $requerimientoRepo;
	}
	public function index(){
		return $this->requerimientoRepo->getList();
	}
}