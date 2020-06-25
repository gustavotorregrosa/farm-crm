import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { jwtFetch } from '../../../suporte/funcoes-customizadas'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.elemSelectEstado = null
        this.instanciaSelectEstado = null
        this.elemSelectCultura = null
        this.instanciaSelectCultura = null
    }

    state = {
        estados: null,
        culturas: null,
        estadoSelecionado: "todos",
        culturaSelecionada: "todos",
        produtores: null,
        areasCultivo: null,
        areaTotalFazenda: null,
        areaReservaFazenda: null,
        countAreasCultivo: null,
        countFazendas: null
    }

    componentDidMount() {
        this.ativaSelectEstado()
        this.ativaSelectCultura()
        this.listaCompletaProdutores()
    }

    listaCompletaProdutores = () => {
        jwtFetch("produtores/listar").then(produtores => {
            this.setState({
                produtores
            })
            setTimeout(() => {
                this.atualizaIndicadores()
            }, 100)
        })
    }


    atualizaIndicadores = () => {
        let areaTotalFazenda = 0
        let countFazendas = 0
        let areaReservaFazenda = 0
        let countAreasCultivo = 0
        let areaTotalCultivo = 0
        let produtores = this.state.produtores
        let estadoSelecionado = this.state.estadoSelecionado
        let culturaSelecionada = this.state.culturaSelecionada
        if (produtores) {
            produtores.map(p => {
                if (estadoSelecionado == "todos" || estadoSelecionado == p.estado.id) {
                    countFazendas++
                    areaTotalFazenda += parseFloat(p.area_total)
                    areaReservaFazenda += parseFloat(p.area_reserva)
                    let areasCultivo = p.areas_cultivo
                    areasCultivo.map(aC => {
                        if (culturaSelecionada == "todos" || culturaSelecionada == aC.tipo) {
                            countAreasCultivo++
                            areaTotalCultivo += parseFloat(aC.area)
                        }
                    })
                }
            })
        }
        this.setState({
            areasCultivo: areaTotalCultivo,
            areaTotalFazenda,
            areaReservaFazenda,
            countAreasCultivo,
            countFazendas
        })
    }

    ativaSelectCultura = () => {
        jwtFetch("culturas/listar").then(culturas => {
            this.setState({
                culturas
            })
            this.instanciaSelectCultura = M.FormSelect.init(this.elemSelectCultura, {})
        })
    }

    alterarCulturaFiltro = () => {
        try {
            this.instanciaSelectCultura.destroy()
        } catch (e) {
            console.log(e)
        }
        this.instanciaSelectCultura = M.FormSelect.init(this.elemSelectCultura, {})
        let culturaSelecionada = this.instanciaSelectCultura.getSelectedValues()[0]

        this.setState({
            culturaSelecionada
        })

        setTimeout(() => {
            this.atualizaIndicadores()
        }, 100)
    }

    listarOptionsCulturas = () => {
        let culturas = []
        if (this.state.culturas) {
            culturas = this.state.culturas.map(el => (<option value={el.id}>{el.nome}</option>))
        }
        return culturas
    }

    listarOptionsEstados = () => {
        let estados = []
        if (this.state.estados) {
            estados = this.state.estados.map(el => (<option value={el.id}>{el.nome}</option>))
        }

        return estados
    }


    ativaSelectEstado = () => {
        jwtFetch("estados/listar").then(estados => {
            this.setState({
                estados
            })
            this.instanciaSelectEstado = M.FormSelect.init(this.elemSelectEstado, {})
        })
    }

    alterarEstadoFiltro = () => {
        try {
            this.instanciaSelectEstado.destroy()
        } catch (e) {
            console.log(e)
        }
        this.instanciaSelectEstado = M.FormSelect.init(this.elemSelectEstado, {})
        let estadoSelecionado = this.instanciaSelectEstado.getSelectedValues()[0]

        this.setState({
            estadoSelecionado
        })

        setTimeout(() => {
            this.atualizaIndicadores()
        }, 100)


    }

    render() {
        return (
            <div>
                <div className="container">
                    <h4>Dashboard</h4>

                    <div className="card" style={{ padding: '1em' }}>
                        <h5>Filtros: </h5>
                        <div className="row">
                            <div className="col s5">
                                <select ref={
                                    select => this.elemSelectEstado = select
                                }
                                    onChange={() => this.alterarEstadoFiltro()}>
                                    <option value="todos" selected>Todos os Estados</option>
                                    {this.listarOptionsEstados()}
                                </select>
                            </div>
                            <div className="col offset-s1 s5">
                                <select ref={
                                    select => this.elemSelectCultura = select
                                }
                                    onChange={() => this.alterarCulturaFiltro()}>
                                    <option value="todos" selected >Todas as Culturas</option>
                                    {this.listarOptionsCulturas()}
                                </select>
                            </div>

                        </div>

                    </div>

                    <br />
                    <div className="card" style={{ padding: '1em' }}>
                        <h5>Totais: </h5>
                        <div className="row">
                            <div className="col s4">
                                <h6>Área total de fazendas (ha)</h6>
                                <p>{this.state.areaTotalFazenda}</p>
                            </div>
                            <div className="col s4">
                                <h6>Área total de reservas (ha)</h6>
                                <p>{this.state.areaReservaFazenda}</p>
                            </div>
                            <div className="col s4">
                                <h6>Áreas cultivadas (ha)</h6>
                                <p>{this.state.areasCultivo}</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col s5">
                                <h6>Contagem de fazendas</h6>
                                <p>{this.state.countFazendas}</p>
                            </div>
                            <div className="col offset-s1 s5">
                                <h6>Contagem áreas de cultivo</h6>
                                <p>{this.state.countAreasCultivo}</p>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        )

    }

}

export default Dashboard