import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './styles.css';
import fire from '../../services/Fire';

export default class Signin extends Component {
    state = {
        "email": '',
        "password": '',
        "error": ''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)

        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => { })
            .catch((error) => {
                console.log(error);
                this.setState({ error: error.message });
                console.log(this.state.error);
            })
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id="main-container">
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
        );
    }
}