import React from "react"
import axios from "axios";

import './Login.css';


class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
        };
    };

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            email,
            password,
        } = this.state;

        axios.post('/api/register', { name, email, password })
            .then((result) => {
                this.props.history.push("/login");
            });
    };

    render() {
        const {
            name,
            email,
            password
        } = this.state;

        return (
            <div className="container">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <h2 className="form-signin-heading">Register</h2>
                    <label htmlFor="inputName" className="sr-only">Name</label>
                    <input type="text" className="form-control" placeholder="Name" name="name" value={name} onChange={this.onChange} required />
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" className="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;
