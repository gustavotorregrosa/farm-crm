import React, { Component } from 'react'
import SearchBar from '../searchBar/searchBar'
import TabelaProdutores from './tabelaProdutor'
import ListaPaginacao from '../searchBar/listaPaginacao'
import ModalEditaCriaProdutor from './modalEditaCriaProdutor'
import ModalDeletaProdutor from './modalDeletaProdutor'
import * as helper from '../../../suporte/helper'
import { jwtFetch } from '../../../suporte/funcoes-customizadas'

class TelaProdutores extends Component {

    state = {
        produtores: null,
        textoBusca: null,
        pagina: 1
    }

    numItensPorPagina = 5

    alteraPagina = pagina => {
        this.setState({
            pagina
        })
    }


    listaCompletaProdutores = () => {
        jwtFetch("produtores/listar").then(produtores => {
            this.setState({
                produtores,
                pagina: 1
            })
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.listaCompletaProdutores()
        }, 100)
    }

    getProdutores = () => {
        let produtores = this.state.produtores
        let t = this.state.textoBusca
        if (t) {
            produtores = this.state.produtores.filter(p => p.nome.toLowerCase().includes(t.toLowerCase()))
        }
        return produtores
    }

    getProdutoresPaginados = () => {
        let pagina = this.state.pagina
        let produtoresF = null
        let produtores = this.getProdutores()
        if (produtores) {
            produtoresF = produtores.filter((el, i) => {
                let inicioEm = (pagina - 1) * this.numItensPorPagina
                let finalEm = pagina * this.numItensPorPagina - 1
                if ((i >= inicioEm) && (i <= finalEm)) {
                    return true
                }
                return false
            })
        }
        return produtoresF
    }


    alteraTextoBusca = (t) => {
        let texto = t ? t : null
        this.setState({
            textoBusca: texto,
            pagina: 1
        })
    }

    abreModalCriaProdutor = e => {
        e.preventDefault()
        this.abreModalEditaProdutor()
    }

    abreModalEditaProdutor = (produtor = null) => {
        this.childAbreModalEditaProdutor(produtor)
    }

    abreModalDeletaProdutor = produtor => {
        this.childAbreModalDeletaProdutor(produtor)
    }


    render() {
        return (
            <div className="container">
                <br />
                <br />
                <div className="row">
                    <div className="col s5"><h5>Produtor</h5></div>
                    <div className="col s6">
                        <SearchBar informaTxtBusca={(t) => { this.alteraTextoBusca(t) }} />
                    </div>
                    <div className="col s1">
                        <a
                            onClick={e => this.abreModalCriaProdutor(e)}
                            style={{
                                marginTop: "1em"
                            }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
                    </div>
                </div>

                <div className="row">
                    <div className="col s4 offset-s8">
                        <ListaPaginacao pagina={this.state.pagina} alteraPagina={(p) => this.alteraPagina(p)} numItensPorPagina={this.numItensPorPagina} itens={this.getProdutores()} />
                    </div>
                </div>
                <br />
                <br />
                <TabelaProdutores deletar={(el) => this.abreModalDeletaProdutor(el)} editar={(el) => this.abreModalEditaProdutor(el)} culturas={this.getProdutoresPaginados()} />        
                <ModalEditaCriaProdutor listarProdutores={() => this.listaCompletaProdutores()}
                setAbreModal={f => this.abreModalEditaProdutor = f} />
                <ModalDeletaProdutor listarProdutores={() => this.listaCompletaProdutores()} setAbreModal={f => this.childAbreModalDeletaProdutor = f}  />
                </div>
        )
    }
}

export default TelaProdutores