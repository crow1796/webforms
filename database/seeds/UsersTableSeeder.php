<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('users')->delete();

        $users = [
        	'first_name' => 'Joshua',
        	'midde_name' => '',
        	'last_name' => 'Tundag',
        	'email' => 'joshua@syntacticsinc.com',
        	'password' => \Hash::make('admin'),
            'created_at' => \Carbon\Carbon::now(),
        ];

        \DB::table('users')->insert($users);
    }
}
