import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import TabelaCulturas from './tabelaCultura'
import ModalCriaCultura from './modalNovaCultura'
import ModalEditaCultura from './modalEditaCultura'
import ModalDeletaCultura from './modalDeletaCultura'
import ListaPaginacao from '../searchBar/listaPaginacao'
import * as helper from '../../../suporte/helper'
import { jwtFetch } from '../../../suporte/funcoes-customizadas'

class TelaCulturas extends Component {

    state = {
        culturas: null,
        textoBusca: null,
        pagina: 1
    }

    numItensPorPagina = 5

    alteraPagina = pagina => {
        this.setState({
            pagina
        })
    }


    listaCompletaCulturas = () => {
        jwtFetch("culturas/listar").then(culturas => {
            this.setState({
                culturas,
                pagina: 1
            })
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.listaCompletaCulturas()
        }, 100)
    }

    getCulturas = () => {
        let culturas = this.state.culturas
        let t = this.state.textoBusca
        if (t) {
            culturas = this.state.culturas.filter(c => c.nome.toLowerCase().includes(t.toLowerCase()))
        }
        return culturas
    }

    getCulturasPaginadas = () => {
        let pagina = this.state.pagina
        let culturasF = null
        let culturas = this.getCulturas()
        if (culturas) {
            culturasF = culturas.filter((el, i) => {
                let inicioEm = (pagina - 1) * this.numItensPorPagina
                let finalEm = pagina * this.numItensPorPagina - 1
                if ((i >= inicioEm) && (i <= finalEm)) {
                    return true
                }
                return false
            })
        }
        return culturasF
    }


    alteraTextoBusca = (t) => {
        let texto = t ? t : null
        this.setState({
            textoBusca: texto,
            pagina: 1
        })
    }

    abreModalCriaCultura = e => {
        e.preventDefault()
        this.childAbreModalCriaCultura()
    }

    abreModalEditaCultura = cultura => {
        this.childAbreModalEditaCultura(cultura)
    }

    abreModalDeletaCultura = cultura => {
        this.childAbreModalDeletaCultura(cultura)
    }


    render() {
        return (
            <div className="container">
                <br />
                <br />
                <div className="row">
                    <div className="col s5"><h5>Culturas</h5></div>
                    <div className="col s6">
                        <SearchBar informaTxtBusca={(t) => { this.alteraTextoBusca(t) }} />
                    </div>
                    <div className="col s1">
                        <a
                            onClick={e => this.abreModalCriaCultura(e)}
                            style={{
                                marginTop: "1em"
                            }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
                    </div>
                </div>

                <div className="row">
                    <div className="col s4 offset-s8">
                        <ListaPaginacao pagina={this.state.pagina} alteraPagina={(p) => this.alteraPagina(p)} numItensPorPagina={this.numItensPorPagina} itens={this.getCulturas()} />
                    </div>
                </div>
                <br />
                <br />
                <TabelaCulturas deletar={(el) => this.abreModalDeletaCultura(el)} editar={(el) => this.abreModalEditaCultura(el)} culturas={this.getCulturasPaginadas()} />
                <ModalCriaCultura listarCulturas={() => this.listaCompletaCulturas()} setAbreModal={f => this.childAbreModalCriaCultura = f} />
                <ModalEditaCultura listarCulturas={() => this.listaCompletaCulturas()} setAbreModal={f => this.childAbreModalEditaCultura = f} />
                <ModalDeletaCultura listarCulturas={() => this.listaCompletaCulturas()} setAbreModal={f => this.childAbreModalDeletaCultura = f} />

            </div>
        )
    }
}

export default TelaCulturas