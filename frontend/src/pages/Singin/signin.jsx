import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default class Signin extends Component {
    state = {
        "email": '',
        "password": '',
        "error": ''
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        await api.post('signin', this.state)
            .then(res => {
                console.log(res.data.token);
                localStorage.setItem('__agile_token', JSON.stringify(res.data.token));
                this.props.history.push('/main');
                toast("Login realizado com sucesso!");
            })
            .catch(err => console.log(`ESSE EH O ERRO: ${err}`));

    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id="main-container">
                <div className="boxLogin">
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error !== '' ? (<span className="error">{this.state.error}</span>) : null}

                        <input type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            placeholder="E-mail" />
                        <input type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            placeholder="Senha" />
                        <button type="submit">Entrar</button>

                        <Link to="/signup" className="cadastrar">Ainda não é cadastrado?</Link>
                    </form>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover />
                <ToastContainer />
            </div>
        );
    }
}