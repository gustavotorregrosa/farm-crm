<?php

namespace App\Models;

use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Produtor extends Model
{
    protected $table = "produtor";
    protected $guarded = [];
    protected $appends = ['registro', 'estado'];
    public $registro;

    public function getRegistroAttribute(){
        return $this->cnpj ?? $this->cpf;
    }

    public function cidade(){
        return $this->belongsTo('App\Models\Cidade', 'id_cidade');
    }

    public function getEstadoAttribute(){
        $estado = DB::select('select e.* from unidade_federativa as e join cidade as c on c.id_estado = e.id where c.id = ?', [$this->id_cidade]);
        return $estado[0];
    }

    public function areas_cultivo(){
        return $this->hasMany('App\Models\AreaCultivada', 'produtor');
    }

    public function save($options = [])
    {
        $valido = false;
        if (validaCPF($this->registro)) {
            $this->cpf = $this->registro;
            $valido = true;
        } else if (validaCNPJ($this->registro)) {
            $this->cnpj = $this->registro;
            $valido = true;
        }

        if(!$valido){
            throw new Exception("CPF ou CNPJ inválido");
        }

        parent::save($options);
    }

}
