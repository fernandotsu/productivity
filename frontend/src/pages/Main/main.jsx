import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false,
            project: []
        };
    }

    componentWillMount = () => {

    }

    togglePopup = (e) => {
        e.preventDefault();
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="header">
                    <h2>Logo</h2>
                </div>

                <div className="row">
                    <div className="side">
                        <aside className="side">
                            <nav className="menu">
                                <a href="/" onClick={this.togglePopup.bind(this)}>
                                    Adicionar projeto
                                </a>
                                <Link to="/">
                                    <i className="fa fa-users"></i> Usuários
                                </Link>
                            </nav>
                        </aside>
                    </div>
                    <div className="main">

                        <div className="card">
                            ITEM 01
                        </div>
                        <div className="card">
                            ITEM 02
                        </div>

                    </div>
                </div>

                <div className="footer">
                    <h2>Footer</h2>
                </div>

                {this.state.showPopup ?
                    <Popup
                        text='Projeto'
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </BrowserRouter>
        )
    }
}


class Popup extends React.Component {
    state = {
        projeto: '',
        inicio: Date.now(),
        final: Date.now()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>

                    <form onSubmit={this.handleSubmit}>
                        <input className="name-project" onChange={this.handleInputChange} type="text" name="projeto" value={this.state.projeto} />
                        <input className="date-project" onChange={this.handleInputChange} type="date" name="inicio" value={this.state.inicio} />
                        <input className="date-project" onChange={this.handleInputChange} type="date" name="final" value={this.state.final} />

                        <button type="submit">Salvar</button>
                    </form>

                    <button className="close-button" onClick={this.props.closePopup}>Fechar</button>
                </div>
            </div>
        );
    }
}