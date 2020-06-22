<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UnidadeFederativa;

class EstadosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $estados = UnidadeFederativa::orderBy('nome')->get();
        return respostaCors($estados, 200);
    }

 
}
