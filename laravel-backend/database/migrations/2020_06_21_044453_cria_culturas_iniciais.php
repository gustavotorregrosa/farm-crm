<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriaCulturasIniciais extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $culturas = [
            'Soja',
            'Milho',
            'Algodão',
            'Café',
            'Cana de Açúcar'
        ];

        foreach($culturas as $c){
            \App\Models\Cultura::create([
                'nome' => $c
            ]);
        }
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
