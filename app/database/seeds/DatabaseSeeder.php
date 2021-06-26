<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('UnidadesTableSeeder');
		$this->call('PerfilesTableSeeder');
		$this->call('BancosTableSeeder');
		$this->call('UserTableSeeder');
	}

}
