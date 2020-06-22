<?php

function logaUsuarioBanco(){
    $idUsuario = \Auth::user()->id;
    $usuarioBanco = App\Models\User::find($idUsuario);
    \Auth::logout();
    \Auth::login($usuarioBanco);
}

function carregaEPerfis(){
    $perfil = [
        'perfilSistemico' => \Auth::user()->perfilSistemico->nome,

    ];
    \Auth::user()->perfil = (object) $perfil;
    \Auth::user()->originarioDoBanco = true;
}

function isUsuarioBanco(){
    return (bool) \Auth::user()->originarioDoBanco;
}

function carregaPerfilUsuarioBanco(){
    if(!isUsuarioBanco()){
        logaUsuarioBanco();
        carregaEPerfis();
    }
}


/////////////

function mapeiaPerfis($usuario){
    $perfilSistemico = $usuario->perfilSistemico->nome;
    return [
        'perfilSistemico' => $perfilSistemico
    ];
}