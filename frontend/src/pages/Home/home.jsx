import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { baseApiUrl, userKey } from '../../services/api';

import "antd/dist/antd.css";

import {
    Layout, Menu, Breadcrumb, Icon, List, Card, Button, Dropdown, message, Modal, Input, Tooltip, Checkbox
} from 'antd';

const {
    Header, Content, Footer, Sider,
} = Layout;
// const SubMenu = Menu.SubMenu

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false,
            collapsed: false,
            loading: false,
            visible: false,
            project: [],
            projectid: null,
            newProjectName: '',
            completed: false,
            canceled: false
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleSaveProject = (e) => {
        this.setState({ loading: true });
        const p = {
            name: this.state.newProjectName,
            completed: this.state.projectid ? this.state.completed : false,
            canceled: this.state.projectid ? this.state.canceled : false
        };
        axios.post(`${baseApiUrl}/project`, p)
            .then((res) => {
                this.getData();
                message.success('Projeto atualizado com sucesso!');
                this.setState({ loading: false, visible: false });
            })
            .catch((err) => {
                message.warning(`${err}`);
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 1500);
            });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
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
        this.getData();
    }

    async getData() {
        await axios.get(`${baseApiUrl}/project`)
            .then((res) => {
                this.setState({
                    project: res.data
                });
            })
            .catch((error) => message.warning(error));
    }

    togglePopup = (e) => {
        e.preventDefault();
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    logout = ({ key }) => {
        switch (key) {
            case '0':
                message.warning('TODO');
                break;
            case '1':
                localStorage.removeItem(userKey);
                message.success('Usuário deslogado!');
                this.props.history.push('/singin')
                break;
            default:
                break;
        }
    };

    menu = (
        <Menu onClick={this.logout}>
            <Menu.Item key="0">
                Preferências
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">Sair</Menu.Item>
        </Menu>
    );

    // toggleChecked = () => {
    //     this.setState({ completed: !this.state.completed });
    // }

    onChangeComplete = (e) => {
        this.setState({
            completed: e.target.completed,
        });
    }

    onChangeCanceled = (e) => {
        this.setState({
            completed: e.target.canceled,
        });
    }

    seeProject = ev => {
        console.log(ev.currentTarget.key);
        console.log(ev.currentTarget.dataset);
        console.log(ev.currentTarget.dataset.card_id);

        this.props.history.push('/board');
    }

    render() {
        const { visible, loading } = this.state;
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
                            <div>
                                <b style={{ paddingRight: '10px', textTransform: 'uppercase' }}>Projetos</b>
                                <Button onClick={this.showModal} type="primary" shape="circle" icon="plus" />
                                <Modal
                                    title="Editar projeto"
                                    visible={visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    footer={[
                                        <Button key="back" onClick={this.handleCancel}>Voltar</Button>,
                                        <Button key="submit" type="primary" loading={loading} onClick={this.handleSaveProject}>
                                            Salvar
                                        </Button>,
                                    ]}>
                                    <form>
                                        <Input
                                            placeholder="Nome do projeto"
                                            onChange={this.handleInputChange}
                                            name="newProjectName"
                                            value={this.state.newProjectName}
                                            prefix={<Icon type="project" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            suffix={
                                                <Tooltip title="Nome do projeto">
                                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                                </Tooltip>
                                            }
                                        />
                                        {this.state.projectid ?
                                            <Checkbox
                                                checked={this.state.completed}
                                                onChange={this.onChangeComplete}
                                            >
                                                Concluído
                                            </Checkbox> : null
                                        }
                                        {this.state.projectid ?
                                            <Checkbox
                                                checked={this.state.canceled}
                                                onChange={this.onChangeCanceled}
                                            >
                                                Cancelado
                                            </Checkbox> : null
                                        }
                                    </form>
                                </Modal>
                            </div>
                            <div>
                                <Dropdown overlay={this.menu}>
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
                                            <Card
                                                key={item.id}
                                                title={item.name}
                                                actions={[<Icon type="project" data-card_id={item.id} key={item.id} onClick={this.seeProject} />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                                            >
                                                {item.completed ? 'Projeto concluído' : 'Projeto em andamento'}
                                            </Card>
                                        </List.Item>
                                    )}
                                />

                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>

                        </Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        )
    }
}