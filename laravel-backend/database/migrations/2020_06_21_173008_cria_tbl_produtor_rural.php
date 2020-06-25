<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CriaTblProdutorRural extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produtor', function (Blueprint $table) {
            $table->id();
            $table->string('cpf', 11)->nullable();
            $table->string('cnpj', 14)->nullable();
            $table->index(['cpf', 'cnpj']);
            $table->string('nome');
            $table->string('nome_fazenda');
            $table->unsignedDecimal('area_total', 20,2)->nullable();
            $table->unsignedDecimal('area_reserva', 20,2)->nullable();
            $table->unsignedBigInteger('id_cidade');
            $table->foreign('id_cidade')->references('id')->on('cidade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produtor');
    }
}
