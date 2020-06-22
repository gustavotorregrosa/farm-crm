import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import * as helper from '../../../suporte/helper'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import VMasker from 'vanilla-masker'
import { jwtFetch } from '../../../suporte/funcoes-customizadas'

class EditaProdutor extends Component {

    constructor(props) {
        super(props)
        this.elem = null
        this.elemSelectEstado = null
        this.instanciaSelectEstado = null
        this.elemSelectCidade = null
        this.instanciaSelectCidade = null
        this.instance = null
        this.abrirModal = this.abrirModal.bind(this)
        this.inputRegistro = null
    }

    state = {
        loading: false,
        loadingCidades: false,
        id: "",
        nome: "",
        nomeFazenda: "",
        cidade: "",
        estado: "",
        registro: "",
        estados: null,
        cidades: null
    }

    componentDidMount() {
        this.elem = document.getElementById('modal-edita-produtor')
        this.instance = M.Modal.init(this.elem, {
            onCloseEnd: () => {
                this.setState({
                    loading: false,
                    id: "",
                    nome: "",
                    nomeFazenda: "",
                    estado: "",
                    cidade: "",
                    registro: ""
                })
                setTimeout(() => {
                    M.updateTextFields()
                }, 100)
                
                try {
                    this.instanciaSelectCidade.destroy()
                    this.instanciaSelectEstado.destroy()
                } catch (e){
                    console.log(e)
                }
                
                this.elemSelectEstado = null
                this.instanciaSelectEstado = null

            }
        })
        
        this.ativarMascara()
        this.ativaSelectEstado()
        this.props.setAbreModal(this.abrirModal)
        this.inputRegistro.addEventListener('input', (e) => {
            let registro = e.target.value
            this.setState({
                registro
            })

        });
    }


    listaEstados = () => {
        jwtFetch("estados/listar").then(estados => {
            this.setState({
                estados
            })
        })
    }

    selecionaCidadeProdutor = () => {
        let estado = this.state.estado.id || ""
        this.setState({
            loadingCidades: true
        })
        jwtFetch("cidades/listar/" + estado).then(cidades => {
            this.setState({
                cidades,
                loadingCidades: false
            })
            this.elemSelectCidade.value = this.state.cidade.id
            this.instanciaSelectCidade = M.FormSelect.init(this.elemSelectCidade, {})
        })
    }


    selecionaEstadoProdutor(estado) {
        try {
            this.instanciaSelectEstado.destroy() 
        } catch (e) {
            console.log(e)
        }
        this.elemSelectEstado.value = estado
        this.instanciaSelectEstado = M.FormSelect.init(this.elemSelectEstado, {})
    }

    ativarMascara = () => {
        let c, v, m

        let inputHandler = (masks, max, event) => {
            c = event.target;
            v = c.value.replace(/\D/g, '');
            m = c.value.length > max ? 1 : 0;
            VMasker(c).unMask();
            VMasker(c).maskPattern(masks[m]);
            c.value = VMasker.toPattern(v, masks[m]);
        }

        let regMask = ['999.999.999-99', '99.999.999/9999-99'];
        let reg =  this.inputRegistro;
        VMasker(reg).maskPattern(regMask[0]);
        reg.addEventListener('input', inputHandler.bind(undefined, regMask, 14), false);

        
    }

    ativaSelectEstado = () => {
        jwtFetch("estados/listar").then(estados => {
            this.setState({
                estados
            })
            this.instanciaSelectEstado = M.FormSelect.init(this.elemSelectEstado, {})
        })
    }


    listarOptionsEstados = () => {
        let estados = []
        if(this.state.estados){
            estados =  this.state.estados.map(el => (<option value={el.id}>{el.nome}</option>))
        }
       
        return estados
    }

    listarOptionsCidades = () => {
        let cidades = []
        if(this.state.cidades){
            cidades =  this.state.cidades.map(el => (<option value={el.id}>{el.nome}</option>))
        }
       
        return cidades
    }


    alterarEstadoProdutor = () => {
        try {
            this.instanciaSelectEstado.destroy()
        } catch (e){
            console.log(e)
        }
        this.instanciaSelectEstado = M.FormSelect.init(this.elemSelectEstado, {}) 
        let id = this.instanciaSelectEstado.getSelectedValues()[0]
        let estado = {
            id
        }
        this.setState({
            estado
        })
        setTimeout(() => {
            this.selecionaCidadeProdutor()
        }, 100)
       
    }

    alterarCidadeProdutor = () => {
        try {
            this.instanciaSelectCidade.destroy()
        } catch (e) {
            console.log(e)
        }
        
        this.instanciaSelectCidade = M.FormSelect.init(this.elemSelectCidade, {}) 
        let id = this.instanciaSelectCidade.getSelectedValues()[0]
        let cidade = {
            id
        }
        this.setState({
            cidade
        })
       
    }


    aplicarMascara = reg => {
        if (!reg) {
            return null
        }

        let novoReg
        if(reg.length == 11){
            novoReg = reg.slice(0, 3)
            novoReg += "." + reg.slice(3,6)
            novoReg += "." + reg.slice(6,9)
            novoReg += "-" + reg.slice(9,11)
        } else {
            novoReg = reg.slice(0, 2)
            novoReg += "." + reg.slice(2, 5)
            novoReg += "." + reg.slice(5, 8)
            novoReg += "/" + reg.slice(8, 12)
            novoReg += "-" + reg.slice(12, 14)
        }
        
        return novoReg
    }


    abrirModal = (produtor = null) => {
        this.instance.open()
        setTimeout(() => {
            M.updateTextFields()
        }, 100)

        if(!produtor){
            let estado = {
                id: 20
            }
            let cidade = {
                id: 3830
            }
            this.setState({
                estado,
                cidade
            })
            produtor = {
                registro: "",
                nome_fazenda: "",
                estado,
                cidade
            }
        }
       
            this.setState({
                ...produtor,
                registro: this.aplicarMascara(produtor.registro),
                nomeFazenda: produtor.nome_fazenda
            })
            setTimeout(() => {
                this.selecionaEstadoProdutor(produtor.estado.id)
                this.selecionaCidadeProdutor()
            }, 100)
        
       
    }

    fechaModal = () => {
        this.instance.close()
    }

    alterarNomeProdutor = (e) => {
        let nome = e.target.value
        this.setState({
            nome
        })
    }

    alterarNomeFazenda = (e) => {
        let nomeFazenda = e.target.value
        this.setState({
            nomeFazenda
        })
    }

    alterarCidade = (e) => {
        let cidade = e.target.value
        this.setState({
            cidade
        })
    }

    alterarRegistro = (e) => {
        let registro = e.target.value
        this.setState({
            registro
        })
    }

    salvaProdutor = e => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let myHeaders = new Headers
        myHeaders.set("Content-Type", "application/json")
        let opcoes = {
            url: 'produtores/salvar',
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                nome: this.state.nome,
                nome_fazenda: this.state.nomeFazenda,
                id_cidade: this.state.cidade.id,
                registro: this.state.registro
            }),

            headers: myHeaders
        }
        setTimeout(() => {
            jwtFetch(opcoes.url, opcoes).then(r => {
                M.toast({ html: r.mensagem })
                this.fechaModal()
                this.props.listarProdutores()
            }).catch(r => {
                this.fechaModal()
            })
        }, 1000);
    }

    render() {
        return (
            <div id="modal-edita-produtor" style={{maxHeight: '100%', width: '80%', overflow: 'visible'}} className="modal">
                <div className="row modal-content">
                    <div className="">
                        <div className="input-field col s5">
                            <input value={this.state.nome} onChange={(e) => this.alterarNomeProdutor(e)} id="novo-nome-produtor" type="text" className="validate" />
                            <label htmlFor="novo-nome-produtor">Nome Produtor</label>
                        </div>
                    </div>

                    <div className="">
                        <div className="input-field col offset-s1 s5">
                            <input value={this.state.nomeFazenda} onChange={(e) => this.alterarNomeFazenda(e)} id="novo-nome-fazenda" type="text" className="validate" />
                            <label htmlFor="novo-nome-fazenda">Nome Fazenda</label>
                        </div>
                    </div>
                </div>

                <div className="row modal-content">
                    <div className="modal-content">
                        <div className="input-field col s3">
                            <input ref={
                                input => this.inputRegistro = input
                            } 
                            defaultValue={this.state.registro} id="novo-registro-produtor" type="text" className="validate" />
                            <label htmlFor="novo-registro-produtor">Registro Produtor</label>
                        </div>

                        <div className="input-field col offset-s1 s3">
                            <select ref={
                                select => this.elemSelectEstado = select
                            }
                                onChange={() => this.alterarEstadoProdutor()}>
                                <option value="0" selected>Estados</option>
                                {this.listarOptionsEstados()}
                            </select>
                            <label>Estados</label>
                        </div>

                        <div className="input-field col offset-s1 s3">
                            <select ref={
                                select => this.elemSelectCidade = select
                            }
                            onChange={() => this.alterarCidadeProdutor()}
                            >
                                <option value="0" selected>Cidades</option>
                                {this.listarOptionsCidades()}
                            </select>
                            <label>Cidades</label>
                            {this.state.loadingCidades ? (<div className="progress"><div className="indeterminate"></div></div>) : null}

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="modal-content">
                       


                    </div>
                </div>

                <div className="modal-footer">
                    <a onClick={e => this.salvaProdutor(e)} href="#" className="waves-effect waves-green btn-flat">Salvar</a>

                </div>
                {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}

            </div>
        )
    }
}

export default EditaProdutor