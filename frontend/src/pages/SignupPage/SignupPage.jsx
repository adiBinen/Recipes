import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SignupPage.scss';

class SignupPage extends Component {
    state = {
        name: '',
        img: '',
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
        const nameIsValid = this.state.name.length > 2;
        this.setState({ nameIsValid })
        if (nameIsValid) {
            await this.props.signup({name: this.state.name, img: this.state.img})
            this.setState({ redirect: true });
        }
    }
    
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={'/'} />;
        }
        return (
        <section className="signup-page">
            <h1 className="signup-title">Sign up</h1>
            <form className="signup-form" onSubmit={this.handleSubmit}>
                <label className="signup-label">Username: <span className="signup-label-span">(required)</span></label>
                {!this.state.nameIsValid && <p className="signup-error">Username is too short</p>}
                <input className="signup-input" type="text" onChange={this.handleChange('name')} required/>
                <label className="signup-label">Profile Image: <span className="signup-label-span">(optional)</span></label>
                <input  className="signup-input" type="url" onChange={this.handleChange('img')} />
                <input className="submit-signup-btn" type="submit" value="Signup" />
            </form>
        </section>
        );
    }
}

export default SignupPage;
