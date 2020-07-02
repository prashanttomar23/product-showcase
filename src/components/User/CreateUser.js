import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar'
import {
    EuiFieldText,
    EuiFormRow,
    EuiButton,
    EuiForm,
    EuiFieldPassword,

} from '@elastic/eui';

export class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    addUser = (e) => {
        e.preventDefault();
        console.log("from adduser", e)
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }
        axios.post("http://localhost:8080/api/users", user)
            .then(res => console.log(res))
    }
    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div style={{ maxWidth: 200, marginLeft: "10%" }}>

                    <EuiForm component="form">
                        <EuiFormRow label="Full Name" onChange={this.onNameChange} e>
                            <EuiFieldText />
                        </EuiFormRow>
                        <EuiFormRow label="Email Id" onChange={this.onEmailChange}>
                            <EuiFieldText />
                        </EuiFormRow>
                        <EuiFormRow label="Password" onChange={this.onPasswordChange} helpText="Password must be 8 character long.">
                            <EuiFieldPassword />
                        </EuiFormRow>
                        <EuiFormRow>
                            <EuiButton onClick={this.addUser}>Create</EuiButton>
                        </EuiFormRow>
                    </EuiForm>
                </div>
            </div>
        )
    }
}

export default CreateUser

