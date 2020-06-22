<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produtor;

class ProdutoresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $produtores = Produtor::with(['cidade'])->orderBy('nome')->get();
        return respostaCors($produtores, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $produtor = $request->id ? Produtor::find($request->id) : new Produtor;

        $produtor->nome = $request->input('nome');
        $produtor->nome_fazenda = $request->input('nome_fazenda');
        $produtor->id_cidade = $request->input('id_cidade');
        $produtor->cnpj = null;
        $produtor->cpf = null;
        $produtor->registro = str_replace([".", "-", "/"], "", $request->input('registro'));
        $produtor->save();  
        return respostaCors([], 200, "Produtor " .  $produtor->nome . " salvo");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
     
        $produtor = Produtor::find($id);
        $produtor->delete();
        return respostaCors([], 200, "Produtor " .  $produtor->nome . " deletado");

    }
}
