<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnidadeFederativa extends Model
{
    protected $table = "unidade_federativa";
    protected $guarded = [];

    public function cidades(){
        return $this->hasMany('App\Models\Cidade', 'id_estado');
    }
}