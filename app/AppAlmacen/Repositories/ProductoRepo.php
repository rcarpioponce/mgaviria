<?php
namespace AppAlmacen\Repositories;
use AppAlmacen\Entities\Producto;
class ProductoRepo extends BaseRepo{
	public function getModel(){
		return new Producto;
	}
	public function getAll(){
		return \DB::table('productos')
            ->join('unidades', 'productos.unidad_id', '=', 'unidades.id')
            ->select('productos.*', 'unidades.nombre AS nombre_unidad')
            ->get();
	}
	public function getList(){
/*		$inputs = $this->getInputs();
		$inputs['nombre'] = isset($inputs['nombre']) ? $inputs['nombre'] : ''; 
		$nombre = '%'.$inputs['nombre'].'%';
		return \DB::table('productos')
				->where('productos.nombre','LIKE',$nombre)
				->join('categorias','productos.categoria_id','=','categorias.id')
				->join('unidades','productos.unidad_id','=','unidades.id')
				->select('productos.*','unidades.nombre as unidad','categorias.nombre as categoria')
				->orderBy('id','desc')
				->paginate($this->numPaginate); */
		$inputs = $this->getInputs();
		$inputs['nombre'] = isset($inputs['nombre']) ? $inputs['nombre'] : ''; 
		$nombre = '%'.$inputs['nombre'].'%';
		return \DB::table('productos')
				->where('productos.nombre','LIKE',$nombre)
				->join('categorias','productos.categoria_id','=','categorias.id')
				->join('unidades','productos.unidad_id','=','unidades.id')
				->join('stock_productos','productos.id', '=', 'stock_productos.producto_id')
				->select('productos.*','unidades.nombre as unidad','categorias.nombre as categoria','stock_productos.cantidad_actual')
				->orderBy('id','desc')
				->paginate($this->numPaginate);				
	}
	public function add(){
		$inputs = $this->getInputs();
		$this->model->nombre = $inputs['nombre'];
		$this->model->descripcion = $inputs['descripcion'];
		$this->model->precio_venta = $inputs['precio_venta'];
		$this->model->precio_base = $inputs['precio_base'];
		$this->model->stock_minimo = $inputs['stock_minimo'];
		$this->model->stock_maximo = $inputs['stock_maximo'];
		$this->model->categoria_id = $inputs['categoria_id'];
		$this->model->unidad_id = $inputs['unidad_id'];
		$this->model->save();

		//return $this->model->id;
		$id = ''.$this->model->id;
		$modeloRet = 	\DB::table('productos')
				->where('productos.id','=',$id)
				->join('categorias','productos.categoria_id','=','categorias.id')
				->join('unidades','productos.unidad_id','=','unidades.id')
				->select('productos.*','unidades.nombre as unidad','categorias.nombre as categoria')->get();

		return \Response::json($modeloRet[0]);		
		//return $modeloRet;
	}
	public function update($id){
		$model = $this->find($id);
		$inputs = $this->getInputs();
		$model->nombre = $inputs['nombre'];
		$model->descripcion = $inputs['descripcion'];
		$model->precio_venta = $inputs['precio_venta'];
		$model->precio_base = $inputs['precio_base'];
		$model->stock_minimo = $inputs['stock_minimo'];
		$model->stock_maximo = $inputs['stock_maximo'];
		$model->categoria_id = $inputs['categoria_id'];
		$model->unidad_id = $inputs['unidad_id'];
		$model->save();

		$modeloRet = 	\DB::table('productos')
				->where('productos.id','=',$id)
				->join('categorias','productos.categoria_id','=','categorias.id')
				->join('unidades','productos.unidad_id','=','unidades.id')
				->select('productos.*','unidades.nombre as unidad','categorias.nombre as categoria')->get();

		return \Response::json($modeloRet[0]);		
	}
	//falta opcion borrar
	public function delete($id){
		$model = $this->find($id);
		$model->delete();
		return $model;
	}
	public function find($id){
		return $this->model->find($id);
	}
}