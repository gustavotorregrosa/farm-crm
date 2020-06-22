<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriaPrimeiroUsuario extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        \App\Models\User::create([
            'name' => 'Gustavo Torregrosa',
            'email' => 'gustavo.torregrosa@gmail.com',
            'password' => Hash::make('gustavo01')
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
