import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import * as helper from '../../../suporte/helper'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import { jwtFetch } from '../../../suporte/funcoes-customizadas'

class DeletaCultura extends Component {

    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.abrirModal = this.abrirModal.bind(this)
    }

    state = {
        loading: false,
        id: "",
        nome: ""
    }

    componentDidMount() {
        this.elem = document.getElementById('modal-deleta-cultura')
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => this.setState({
                loading: false,
                id: "",
                nome: ""
            })
        })
        this.props.setAbreModal(this.abrirModal)
    }

    abrirModal = (cultura) => {
        this.instance.open()
        this.setState({
            ...cultura
        })
    }

    fechaModal = () => {
        this.instance.close()
    }

    deletaCultura = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let myHeaders = new Headers
        myHeaders.set("Content-Type", "application/json")
        let opcoes = {
            url: 'culturas/deletar/' + this.state.id,
            method: 'delete',
            headers: myHeaders
        }
        setTimeout(() => {
            jwtFetch(opcoes.url, opcoes).then(r => {
                M.toast({ html: r.mensagem })
                this.fechaModal()
                this.props.listarCulturas()
            }).catch(r => {
                M.toast({ html: r.conteudo.mensagem })
                this.fechaModal()
            })
        }, 1000);
    }

    render() {
        return (
            <div id="modal-deleta-cultura" className="modal">
                <div className="modal-content">
                    <div className="input-field col s6">
                        <p>Deletar a cultura {this.state.nome} ?</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <a onClick={e => this.deletaCultura(e)} href="#" className="waves-effect waves-green btn-flat">Deletar</a>
                    
                </div>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}

            </div>
        )
    }
}

export default DeletaCultura