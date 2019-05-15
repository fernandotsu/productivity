import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import '../Board/styles.css';

const { Header, Content, Footer } = Layout;

export default class Board extends Component {
    state = {
        steps: [{
            id: 1,
            name: "To do",
        }, {
            id: 2,
            name: "Doing",
        }, {
            id: 3,
            name: "Done",
        }],
    };

    render() {
        const { steps } = this.state;
        return (
            <BrowserRouter>
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Projetos</Breadcrumb.Item>
                            <Breadcrumb.Item>Board</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>

                            {/* {numbers.map((number) =>
                            <ListItem key={number.toString()}
                                    value={number} />

                        )} */}

                            {steps.map((step) =>
                                <div style={{ display: 'flex' }}>
                                    <div className="bloco dropzone" id={`dropzone_${step.id}`}>

                                        <div class="header">
                                            {step.name}
                                        </div>

                                        <div className="postit postit-yellow" draggable={true} >
                                            <div className="postit-content">
                                                <label className="titulo-tarefa"><strong>NOME</strong></label>
                                                <label><strong>Quem:</strong> USER</label>
                                                <label><strong>Prioridade:</strong> PRIORIDADE</label>
                                                <label><strong>Término:</strong> DATA</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>,
            </BrowserRouter>
        );
    }

} 