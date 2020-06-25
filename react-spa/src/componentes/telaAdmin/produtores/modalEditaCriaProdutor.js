import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import * as helper from '../../../suporte/helper'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import VMasker from 'vanilla-masker'
import { jwtFetch } from '../../../suporte/funcoes-customizadas'
import ModalAreaCultivo from './areasCultivo/modalNovaArea'
import listaAreasCultivo from './areasCultivo/listaAreaCultivo'
import ListaAreasCultivo from './areasCultivo/listaAreaCultivo'

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
        cidades: null,
        areaTotal: "",
        areaReserva: "",
        tiposCultura: [],
        areasCultivo: []
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
                    registro: "",
                    areaTotal: "",
                    areaReserva: ""
                })
                setTimeout(() => {
                    M.updateTextFields()
                }, 100)

                try {
                    this.instanciaSelectCidade.destroy()
                    this.instanciaSelectEstado.destroy()
                } catch (e) {
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

      
        jwtFetch("culturas/listar").then(tiposCultura => {
            this.setState({
                tiposCultura
            })
        })
        
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
        let reg = this.inputRegistro;
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
        if (this.state.estados) {
            estados = this.state.estados.map(el => (<option value={el.id}>{el.nome}</option>))
        }

        return estados
    }

    listarOptionsCidades = () => {
        let cidades = []
        if (this.state.cidades) {
            cidades = this.state.cidades.map(el => (<option value={el.id}>{el.nome}</option>))
        }

        return cidades
    }


    alterarEstadoProdutor = () => {
        try {
            this.instanciaSelectEstado.destroy()
        } catch (e) {
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

    listaAreasCultivo = () => {
        let areas = this.state.areasCultivo
        return areas
    }

    listaTiposCultura = () => {
        let tipos = this.state.tiposCultura
        return tipos
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
        if (reg.length == 11) {
            novoReg = reg.slice(0, 3)
            novoReg += "." + reg.slice(3, 6)
            novoReg += "." + reg.slice(6, 9)
            novoReg += "-" + reg.slice(9, 11)
        } else {
            novoReg = reg.slice(0, 2)
            novoReg += "." + reg.slice(2, 5)
            novoReg += "." + reg.slice(5, 8)
            novoReg += "/" + reg.slice(8, 12)
            novoReg += "-" + reg.slice(12, 14)
        }

        return novoReg
    }


    abreModalNovaAreaCultivo = e => {
        e.preventDefault()
        this.childAbreModalAreaCultivo()
    }



    abrirModal = (produtor = null) => {
        this.instance.open()
        setTimeout(() => {
            M.updateTextFields()
        }, 100)

        if (!produtor) {
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
                cidade,
                areasCultivo: []
            }
        }

        this.setState({
            ...produtor,
            registro: this.aplicarMascara(produtor.registro),
            nomeFazenda: produtor.nome_fazenda,
            areaTotal: produtor.area_total,
            areaReserva: produtor.area_reserva,
            areasCultivo: produtor.areas_cultivo
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

    alterarAreaTotalProdutor = (e) => {
        let areaTotal = e.target.value
        this.setState({
            areaTotal
        })
    }

    alterarAreaReservaProdutor = (e) => {
        let areaReserva = parseFloat(e.target.value)
        let areaTotal = parseFloat(this.state.areaTotal)
        console.log("reserva " + areaReserva)
        console.log("total " + areaTotal)
        if (areaReserva > areaTotal) {
            M.toast({ html: 'Área de reserva não pode ser maior do que área total' })
            return
        }

        this.setState({
            areaReserva
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

    adicionaAreaCultivo = areaNova => {
        let areasCultivo = this.state.areasCultivo || []

        let areaTotal = this.state.areaTotal
        let areaReserva = this.state.areaReserva
        let areaCultivoUtilizada = 0
        areasCultivo.map(el => {
            areaCultivoUtilizada += el.area
        })
        let areaRestante = areaTotal - areaReserva - areaCultivoUtilizada
        if(areaRestante < areaNova.area){
            M.toast({ html: 'Área restante insuficiente: ' + areaRestante + ' ha'  })
            return
        }

        areasCultivo.push(areaNova)
        this.setState({
            areasCultivo
        })
        
    }

    deletaAreaCultivo = area => {
        let areasCultivoOld = this.state.areasCultivo
        let areasCultivo = areasCultivoOld.filter(a => a.id != area.id)
        this.setState({
            areasCultivo
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
                registro: this.state.registro,
                area_total: this.state.areaTotal,
                area_reserva: this.state.areaReserva,
                areas_cultivo: this.state.areasCultivo
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

            <div>
                <div id="modal-edita-produtor" style={{ width: '80%'}} className="modal">
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
                            <div className="input-field col s5">
                                <input value={this.state.areaTotal} onChange={(e) => this.alterarAreaTotalProdutor(e)} id="nova-area-total-produtor" type="number" className="validate" />
                                <label htmlFor="nova-area-total-produtor">Área Total (ha)</label>
                            </div>

                            <div className="input-field col offset-s1 s5">
                                <input value={this.state.areaReserva} onChange={(e) => this.alterarAreaReservaProdutor(e)} id="nova-area-reserva-produtor" type="number" className="validate" />
                                <label htmlFor="nova-area-reserva-produtor">Área Reserva (ha)</label>
                            </div>


                        </div>
                    </div>

                    <div className="row">
                        <div className="modal-content">
                            <div className="input-field col s5">
                                Área de cultivo
                        </div>
                            <div className="input-field col offset-s5 s2">
                                <a
                                    onClick={e => this.abreModalNovaAreaCultivo(e)}
                                    style={{
                                        marginTop: "1em"
                                    }} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="modal-content">
                            <div className="input-field col s12">
                                <ListaAreasCultivo tiposCulturas={this.listaTiposCultura()} deletaAreaCultivo={area => this.deletaAreaCultivo(area)} areasCultivo={this.listaAreasCultivo()} />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <a onClick={e => this.salvaProdutor(e)} href="#" className="waves-effect waves-green btn-flat">Salvar</a>

                    </div>
                    {this.state.loading ? (<div className="progress"><div className="indeterminate"></div></div>) : null}

                </div>

                <ModalAreaCultivo adicionaAreaCultuvo={area => this.adicionaAreaCultivo(area)} setAbreModal={f => this.childAbreModalAreaCultivo = f} tiposCulturas={this.listaTiposCultura()} />
            </div>
        )
    }
}

export default EditaProdutor