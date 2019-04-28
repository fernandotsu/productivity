import React, { Component } from 'react';

import './styles.css';
import fire from '../../services/Fire';

export default class Signup extends Component {
    state = {
        "email": '',
        "password": '',
        "password2": '',
        "error": ''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)

        if (this.state.password === this.state.password2) {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .catch((error) => {
                    console.log(error);
                })
        } else {
            console.log('As senhas são diferentes');
        }

    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
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
                    <input type="password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.handleInputChange}
                        placeholder="Confirmar a senha" />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}
