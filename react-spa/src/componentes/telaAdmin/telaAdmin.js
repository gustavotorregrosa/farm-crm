import React, {Component} from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './navBar/navBar'
import TelaCulturas from './culturas/telaCultura'
import TelaProdutores from './produtores/telaProdutor'
import Dashboard from './dashboard/telaPrincipal'

class TelaAdmin extends Component {

    componentDidUpdate() {
        if (this.props.logado === false) {
            this.props.history.push('/')
        }
    }

    render(){
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route path='/admin/culturas' component={TelaCulturas} />
                    <Route path='/admin/produtores' component={TelaProdutores} />
                    <Route path='/admin/dashboard' component={Dashboard} />
                    <Redirect from="/admin/*" to="/admin" />
                </Switch>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        logado: state.autenticacao.logado,
        usuario: state.autenticacao.usuario
    }
}

export default connect(mapStateToProps)(TelaAdmin)