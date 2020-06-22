<?php

namespace App\Http\Middleware;

use Closure;

class CheckSysAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (env('PERFIL_DO_BANCO', false)) {
            carregaPerfilUsuarioBanco();
        }
       
        $perfilSistemico = \Auth::user()->perfil->perfilSistemico;
        if(strtolower($perfilSistemico) == 'administrador'){
            return $next($request);
        }

        return respostaCors([], 403, "Usuario nao eh administrador");
    }

    // public function terminate($request, $response)
    // {
    //     if (\Auth::check()) {
    //         \Auth::logout();
    //     }
    // }
}
