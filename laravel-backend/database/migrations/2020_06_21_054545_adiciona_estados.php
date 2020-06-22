<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AdicionaEstados extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $estados = array(
            0 => array('id' => '1', 'nome' => 'Rondônia', 'sigla' => 'RO', 'regiao' => 'Norte'),
            1 => array('id' => '2', 'nome' => 'Acre', 'sigla' => 'AC', 'regiao' => 'Norte'),
            2 => array('id' => '3', 'nome' => 'Amazonas', 'sigla' => 'AM', 'regiao' => 'Norte'),
            3 => array('id' => '4', 'nome' => 'Roraima', 'sigla' => 'RR', 'regiao' => 'Norte'),
            4 => array('id' => '5', 'nome' => 'Pará', 'sigla' => 'PA', 'regiao' => 'Norte'),
            5 => array('id' => '6', 'nome' => 'Amapá', 'sigla' => 'AP', 'regiao' => 'Norte'),
            6 => array('id' => '7', 'nome' => 'Tocantins', 'sigla' => 'TO', 'regiao' => 'Norte'),
            7 => array('id' => '8', 'nome' => 'Maranho', 'sigla' => 'MA', 'regiao' => 'Nordeste'),
            8 => array('id' => '9', 'nome' => 'Piauí', 'sigla' => 'PI', 'regiao' => 'Nordeste'),
            9 => array('id' => '10', 'nome' => 'Ceará', 'sigla' => 'CE', 'regiao' => 'Nordeste'),
            10 => array('id' => '11', 'nome' => 'Rio Grande do Norte', 'sigla' => 'RN', 'regiao' => 'Nordeste'),
            11 => array('id' => '12', 'nome' => 'Paraíba', 'sigla' => 'PB', 'regiao' => 'Nordeste'),
            12 => array('id' => '13', 'nome' => 'Pernambuco', 'sigla' => 'PE', 'regiao' => 'Nordeste'),
            13 => array('id' => '14', 'nome' => 'Alagoas', 'sigla' => 'AL', 'regiao' => 'Nordeste'),
            14 => array('id' => '15', 'nome' => 'Sergipe', 'sigla' => 'SE', 'regiao' => 'Nordeste'),
            15 => array('id' => '16', 'nome' => 'Bahia', 'sigla' => 'BA', 'regiao' => 'Nordeste'),
            16 => array('id' => '17', 'nome' => 'Minas Gerais', 'sigla' => 'MG', 'regiao' => 'Sudeste'),
            17 => array('id' => '18', 'nome' => 'Espírito Santo', 'sigla' => 'ES', 'regiao' => 'Sudeste'),
            18 => array('id' => '19', 'nome' => 'Rio de Janeiro', 'sigla' => 'RJ', 'regiao' => 'Sudeste'),
            19 => array('id' => '20', 'nome' => 'São Paulo', 'sigla' => 'SP', 'regiao' => 'Sudeste'),
            20 => array('id' => '21', 'nome' => 'Paraná', 'sigla' => 'PR', 'regiao' => 'Sul'),
            21 => array('id' => '22', 'nome' => 'Santa Catarina', 'sigla' => 'SC', 'regiao' => 'Sul'),
            22 => array('id' => '23', 'nome' => 'Rio Grande do Sul', 'sigla' => 'RS', 'regiao' => 'Sul'),
            23 => array('id' => '24', 'nome' => 'Mato Grosso do Sul', 'sigla' => 'MS', 'regiao' => 'Centro-Oeste'),
            24 => array('id' => '25', 'nome' => 'Mato Grosso', 'sigla' => 'MT', 'regiao' => 'Centro-Oeste'),
            25 => array('id' => '26', 'nome' => 'Goiás', 'sigla' => 'GO', 'regiao' => 'Centro-Oeste'),
            26 => array('id' => '27', 'nome' => 'Distrito Federal', 'sigla' => 'DF', 'regiao' => 'Centro-Oeste'),
        );

        foreach($estados as $e){
            \App\Models\UnidadeFederativa::create($e);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('unidade_federativa')->delete();
    }
}
