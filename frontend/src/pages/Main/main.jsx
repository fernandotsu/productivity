import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import fb from '../../services/Fire';

import './styles.css';

const db = fb.firestore()

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false,
            project: []
        };
    }

    componentWillMount = () => {
        // db.collection("project").get().then(function (doc) {
        //     console.log(doc);
        //     if (doc && doc.exists) {
        //         const myData = doc.data();
        //         console.log(myData);
        //     }
        // }).catch(function (error) {
        //     console.log("Houve um erro ", error);
        // });
        var query = fb.firestore()
            .collection('project')
            .orderBy('name', 'desc')
            .limit(50);

        query.onSnapshot(function (snapshot) {
            if (!snapshot.size) return console.log("VAZIO"); // Display "There are no restaurants".

            snapshot.docChanges().forEach(function (change) {
                if (change.type === 'removed') {
                    console.log(change.doc);
                } else {
                    console.log(change.doc);
                }
            });
        });
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

        db.collection("project").add({
            name: this.state.projeto,
            inicio: this.state.inicio,
            final: this.state.final
        }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
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