<?php

namespace App\Http\Controllers;

use App\Models\Cultura;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CulturasController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $culturas = Cultura::orderBy('nome')->get();
        return respostaCors($culturas, 200);
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
    public function store(Request $request)
    {
        $validacao = Validator::make($request->all(), [
            'nome' => 'required|unique:cultura',
        ]);

        if ($validacao->fails()) {
            return respostaCors([], 422, "Nome de cultura invalido ou repetido");
        }

        Cultura::create([
            'nome' => $request->nome
        ]);

        return respostaCors([], 200, "Cultura " . $request->nome . " adicionada");
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
    public function update(Request $request)
    {
        try {
            $id = $request->id;
            $novoNome = $request->nome;
            $cultura = Cultura::findOrFail($id);
            $nomeAntigo = $cultura->nome;
            if ($novoNome == $nomeAntigo) {
                return respostaCors([], 202, "Nao houve mudanca no nome da cultura");
            }

            $validacao = Validator::make($request->all(), [
                'nome' => 'required|unique:cultura',
            ]);

            if ($validacao->fails()) {
                return respostaCors([], 422, "Nome de cultura invalido ou repetido");
            }

            $cultura->nome = $novoNome;
            $cultura->save();
            return respostaCors([], 200, "Cultura " . $nomeAntigo . " alterada para ".$novoNome);

        } catch (Exception $e) {
            return respostaCors([], $e->getCode(), "Excecao: ".$e->getMessage());
            
        }




     
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        try {

            $cultura = Cultura::findOrFail($id);
            $nome = $cultura->nome;

            if($cultura->areas_cultivo->count()){
                return respostaCors([], 406, "Há áreas cultivadas com a cultura " . $nome);
            }
        

            $cultura->delete();
            return respostaCors([], 200, "Cultura " . $nome . " deletada ");

        } catch (Exception $e) {
            return respostaCors([], $e->getCode(), "Excecao: ".$e->getMessage());
            
        }
    }
}
