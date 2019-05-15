import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseApiUrl, userKey } from '../../services/api';

import './styles.css';
import { message } from 'antd';

export default class Signin extends Component {
    constructor() {
        super();
        this.state = {
            "email": '',
            "password": '',
            "error": ''
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${baseApiUrl}/signin`, this.state)
            .then(res => {
                localStorage.setItem(userKey, JSON.stringify(res.data.token));
                this.props.history.push('/');
                message.success('Usuário logado');
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
            </div>
        );
    }
}