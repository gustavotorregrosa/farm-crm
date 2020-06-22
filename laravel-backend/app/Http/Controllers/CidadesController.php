<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cidade;

class CidadesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($estado = null)
    {
        $cidadesQb;
        if($estado){
            $cidadesQb = Cidade::where('id_estado', $estado)->orderBy('nome');
        } else {
            $cidadesQb = Cidade::orderBy('nome');
        }

        return respostaCors($cidadesQb->get(), 200);
    }
}
