import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { baseApiUrl, userKey } from '../../services/api';

import "antd/dist/antd.css";

import {
    Layout, Menu, Breadcrumb, Icon, List, Card, Button, Dropdown, message
} from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false,
            collapsed: false,
            project: [],
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    async componentWillMount() {
        const json = localStorage.getItem(userKey);
        const userData = JSON.parse(json);

        if (!userData) {
            this.validatingToken = false;
            this.props.history.push('/signin');
            return;
        }

        const res = await axios.post(`${baseApiUrl}/validateToken`, { token: userData });

        if (res.data) {
            // this.props.history.push('/main');
        } else {
            this.props.history.push('/signin');
            localStorage.removeItem(userKey);
        }
    }

    async componentDidMount() {
        await axios.get(`${baseApiUrl}/project`)
            .then((res) => {
                this.setState({
                    project: res.data
                });
            })
            .catch((error) => console.log(error));
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

                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}>
                        <div className="logo">
                            <span style={{ color: 'white' }}>LOGO</span>
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Icon type="project" />
                                <span>Projetos</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="usergroup-add" />
                                <span>Usuários</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="tag" />
                                <span>Etapas</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between' }}>
                            <h1>Projetos</h1>
                            <div>
                                <Dropdown overlay={menu}>
                                    <Button type="primary" shape="circle" icon="user" />
                                </Dropdown>
                            </div>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ padding: 24, minHeight: 360 }}>

                                <List
                                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3, }}
                                    dataSource={this.state.project}
                                    renderItem={item => (
                                        <List.Item>
                                            <Card title={item.name}>
                                                {item.completed ? 'Projeto concluído' : 'Projeto em andamento'}
                                            </Card>
                                        </List.Item>
                                    )}
                                />

                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant UED
                         </Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        )
    }
}

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
    switch (key) {
        case '0':
            break;
        case '1':
            localStorage.removeItem(userKey);
            message.success('Usuário deslogado!');
            this.history.push('/singin')
            break;
        default:
            break;
    }
};

const menu = (
    <Menu onClick={onClick}>
        <Menu.Item key="0">
            Preferências
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">Sair</Menu.Item>
    </Menu>
);

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