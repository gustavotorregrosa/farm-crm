import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

class ModalNovaAreasCultivo extends Component {

    constructor(props) {
        super(props)
        this.elem = null
        this.instance = null
        this.elemSelectTiposCultura = null
        this.instanceSelectTiposCultura = null
        this.abrirModal = this.abrirModal.bind(this)
    }

    state = {
        nome: "",
        tipo: "",
        area: ""
    }

    componentDidMount() {
        this.elem = document.getElementById('modal-nova-area-cultivo')
        this.instance = M.Modal.init(this.elem, {
                onCloseEnd: () => { 
                    this.setState({
                        nome: "",
                        area: ""
                    })

                    setTimeout(() => {
                        M.updateTextFields()
                    }, 100)
                    
                    try {
                        this.instanceSelectTiposCultura.destroy()
                    } catch (e){
                        console.log(e)
                    }

                    this.instanceSelectTiposCultura = null
                }
        })
        this.props.setAbreModal(this.abrirModal)
    }

    abrirModal = () => {
        this.instance.open()
        setTimeout(() => {
            this.instanceSelectTiposCultura = M.FormSelect.init(this.elemSelectTiposCultura, {})
        }, 100)
    }

    fechaModal = () => {
        this.instance.close()
    }

    alterarNomeAreaCultivo = (e) => {
        let nome = e.target.value
        this.setState({
            nome
        })
    }

    alterarExtensaoAreaCultivo = e => {
        let area = e.target.value
        this.setState({
            area
        })

    }

    salvaNovaAreaCultivo = e => {
        e.preventDefault()
        this.fechaModal()
        let area = this.state
        this.props.adicionaAreaCultuvo(area)
    } 

    listarTiposCultura = () => {
        let tiposCulturas = []
        if(this.props.tiposCulturas){
            tiposCulturas =  this.props.tiposCulturas.map(el => (<option value={el.id}>{el.nome}</option>))
        }
       
        return tiposCulturas
    }

    alterarTipoCultura = () => {
        try {
            this.instanceSelectTiposCultura.destroy()
        } catch (e) {
            console.log(e)
        }
        
        this.instanceSelectTiposCultura = M.FormSelect.init(this.elemSelectTiposCultura, {}) 
        let tipo = this.instanceSelectTiposCultura.getSelectedValues()[0]
        this.setState({
            tipo
        })
    }

    render() {
        return (
            <div id="modal-nova-area-cultivo" style={{ maxHeight: '100%', width: '80%', overflow: 'visible' }} className="modal">
                <div className="modal-content row">
                    <div className="input-field col s4">
                        <input value={this.state.nome} onChange={(e) => this.alterarNomeAreaCultivo(e)} id="nova-area-cultivo" type="text" className="validate" />
                        <label htmlFor="nova-area-cultivo">Código/Nome</label>
                    </div>

                    <div className="input-field col s4">
                        <select ref={
                                    select => this.elemSelectTiposCultura = select
                                }
                                onChange={() => this.alterarTipoCultura()}
                                >
                                    <option disabled selected>Selecione uma cultura</option>
                                    {this.listarTiposCultura()}
                                </select>
                                <label>Tipos de Cultura</label>

                    </div>
                    <div className="input-field col s4">
                        <input value={this.state.area} onChange={(e) => this.alterarExtensaoAreaCultivo(e)} id="nova-area-cultivo-extensao" type="number" className="validate" />
                        <label htmlFor="nova-area-cultivo-extensao">Área</label>
                    </div>
                </div>

                <div className="modal-footer">
                    <a onClick={e => this.salvaNovaAreaCultivo(e)} href="#" className="waves-effect waves-green btn-flat">Salvar</a>
                </div>
            </div>
        )
    }

}

export default ModalNovaAreasCultivo