<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cidade extends Model
{
    protected $table = "cidade";
    protected $guarded = [];

    public function estado(){
        return $this->belongsTo('App\Models\UnidadeFederativa', 'id_estado');
    }
}
