import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './LoginPage.scss';

class LoginPage extends Component {
    state = {
        name: '',
        nameIsValid: true,
        redirect: false
    }

    handleChange = (field) => {
        const validationKey = `${field}IsValid`;
        return ev => {
            this.setState({ [field]: ev.target.value, [validationKey]: true });
        }
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();
        const isAuth = await this.props.login({name: this.state.name})
        if (isAuth) this.setState({ redirect: true });
        else this.setState({ nameIsValid: false });
    }
    
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={'/'} />;
        }
        return (
            <div className="login-page">
                <h1 className="login-title">Login</h1>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <label className="login-label">Username:</label>
                    {!this.state.nameIsValid && <p className="login-error">Username is not correct</p>}
                    <input className="login-input" type="text" onChange={this.handleChange('name')} required/>
                    <input className="submit-login-btn" type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default LoginPage;