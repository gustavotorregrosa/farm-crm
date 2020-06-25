<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cultura extends Model
{
    protected $table = "cultura";
    protected $guarded = [];

    public function areas_cultivo(){
        return $this->hasMany('App\Models\AreaCultivada', 'tipo');
    }


}
