import React, { Component } from 'react'

class ListaAreasCultivo extends Component {


    botoes = (el) => {
        return (
            <div>
                <a href="#" onClick={(e) => this.deletar(e, el)}><i className="material-icons">delete</i></a>
            </div>
        )
    }

    deletar = (e, el) => {
        e.preventDefault()
        this.props.deletaAreaCultivo(el)
    }

    areaNome = area => {
        let nome = ""
        let tiposCulturas = this.props.tiposCulturas
        tiposCulturas.map(c => {
            if(c.id == area.tipo){
                nome = c.nome
            }
        })
        return nome
    }

    listaItens = () => {
        if (this.props.areasCultivo) {
            let areasCultivo = [...this.props.areasCultivo]
            let tbl = areasCultivo.map(el => (<tr key={el.id}><td>{el.nome}</td><td>{this.areaNome(el)}</td><td>{el.area}</td><td>{this.botoes(el)}</td></tr>))
            return tbl
        }
        return null
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Tipo</th>
                            <th>Extensão (ha)</th>
                            <th>Ação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.listaItens()}
                    </tbody>
                </table>
            </div>
        )
    }

}


export default ListaAreasCultivo