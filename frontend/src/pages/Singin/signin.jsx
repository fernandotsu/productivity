import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { baseApiUrl, userKey } from '../../services/api';

import './styles.css';

export default class Signin extends Component {
    constructor() {
        super();
        this.state = {
            "email": '',
            "password": '',
            "error": ''
        };
    }

    async componentDidMount() {
        const json = localStorage.getItem(userKey);
        const userData = JSON.parse(json);

        if (!userData) {
            this.validatingToken = false;
            return;
        }

        const res = await axios.post(`${baseApiUrl}/validateToken`, { token: userData });

        if (res.data) {
            console.log('main');
            this.props.history.push('/main');
        } else {
            console.log('remove token local');
            localStorage.removeItem(userKey);
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`${baseApiUrl}/signin`, this.state)
            .then(res => {
                console.log(res.data.token);
                localStorage.setItem(userKey, JSON.stringify(res.data.token));
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