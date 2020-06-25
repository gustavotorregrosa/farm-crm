<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblAreaCultivo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('area_cultivo', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->unsignedBigInteger('produtor');
            $table->foreign('produtor')->references('id')->on('produtor');
            $table->unsignedBigInteger('tipo');
            $table->foreign('tipo')->references('id')->on('cultura');
            $table->unsignedDecimal('area', 20,2)->nullable();
            $table->timestamps();
            $table->index(['produtor', 'nome']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('area_cultivo');
    }
}
