import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

import { Form, Input, Button, notification } from 'antd';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const FormItem = Form.Item;

class Login extends Component {



    handleSubmit = (values) => {
        const loginRequest = Object.assign({}, values);
        console.log(loginRequest)
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.onLogin();
            }).catch(error => {
            if(error.status === 401) {
                notification.error({
                    message: 'WiVa Design',
                    description: 'Je gebruikersnaam en wachtwoord zijn verkeerd. Probeer opnieuw!'
                });
            } else {
                notification.error({
                    message: 'WiVa Design',
                    description: error.message || 'Oeps! Er ging iets verkeerd. Probeer het opnieuw!'
                });
            }
        });
    }

    render() {
        return (
            <div className="login-container">
                <h1 className="page-title">Inloggen</h1>
                <div className="login-content">
                    <Form onFinish={this.handleSubmit} className="login-form">
                        <FormItem name="usernameOrEmail" rules={[{ required: true, message: 'Vul a.u.b. je gebruikersnaam of wachtwoord in!' }]}>
                                <Input
                                    prefix={<UserOutlined/>}
                                    size="large"
                                    name="usernameOrEmail"
                                    placeholder="Gebruikersnaam of email" />
                        </FormItem>
                        <FormItem name = 'password' rules={[{ required: true, message: 'Vul a.u.b. je wachtwoord in!' }]}>
                            <Input
                                prefix={<LockOutlined />}
                                size="large"
                                name="password"
                                type="password"
                                placeholder="Wachtwoord"  />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size="large" className="login-form-button"
                            >Inloggen</Button>
                            Of <Link to="/signup">registreer nu!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}


export default Login;