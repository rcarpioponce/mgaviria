<?php

// Composer: "fzaninotto/faker": "v1.3.0"
//use Faker\Factory as Faker;
use AppAlmacen\Entities\User;
class UserTableSeeder extends Seeder {

	public function run()
	{
		User::create(['nombres'=>'Marie',
						'apellidos'=>'Gaviria',
						'dni'=>'45157371',
						'direccion'=>'av venezuela 1655',
						'email'=>'me@renzocarpio.com',
						'password' => \Hash::make('123456'),	
						'fecha_ini_lab'=>'2015-09-16',
						'fecha_nac'=>'1988-09-16',
						'perfil_id'=>2
						]);

	}

}