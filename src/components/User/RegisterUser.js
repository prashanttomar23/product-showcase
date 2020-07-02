import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css'
import {
    EuiFieldText,
    EuiFormRow,
    EuiButton,
    EuiForm,
    EuiFieldPassword,
    EuiButtonEmpty,
    EuiSelect,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSpacer

} from '@elastic/eui';

class RegisterUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            password: '',
            role: 'User',
            mobileNumber: 0
        }
    }
    addUser = () => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
            mobileNumber: this.state.mobileNumber

        }
        //console.log(this.state.role,"addes user---",user)
        axios.post("http://localhost:8080/api/users", user)
            .then(res => {
                console.log(res, "this is response")
                if (res.data == '200') {
                    window.alert("Registered Sucessfully")
                    window.location.href = "http://localhost:3000/register"
                }
                else if (res.data == '401') {
                    window.alert("User with given Email already exists")
                    window.location.href = "http://localhost:3000/register"
                }
                else {
                    window.alert("Invalid Inputs")
                    window.location.href = "http://localhost:3000/register"
                }
            })
    }
    onNameChange = (e) => this.setState({ name: e.target.value })
    onEmailChange = (e) => this.setState({ email: e.target.value })
    onPasswordChange = (e) => this.setState({ password: e.target.value })
    onMobileChange = (e) => this.setState({ mobileNumber: parseInt(e.target.value) })

    onSelectChange = (e) => {
        console.log(e.target.value)
        this.setState({
            role: e.target.value
        }, () => console.log(this.state.role))

    }

    render() {
        const options = [
            { value: 'User', text: 'as User' },
            { value: 'Manager', text: 'as Manager' },
            { value: 'Admin', text: 'as Admin' },]
        return (
            <div className="registerPage">
                <h1 style={{ textAlign: "center" }}>Register</h1>
                <EuiSpacer size={"l"} />
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
                    <EuiFormRow label="Mobile Number" onChange={this.onMobileChange}>
                        <EuiFieldText />
                    </EuiFormRow>
                    <EuiSpacer />
                    <EuiFlexGroup justifyContent={"spaceAround"} alignItems={"center"}>
                        <EuiFlexItem grow={false}>
                            <EuiButton size="s" onClick={this.addUser} color={"secondary"} fill>Register</EuiButton>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false} >
                            <EuiSelect onChange={this.onSelectChange} compressed={true} options={options}></EuiSelect>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiButtonEmpty size="s" style={{ marginLeft: "10px", marginTop: "10px", padding: "1px" }} className="loginBtn">
                        <Link to="/" className="nav-link" style={{ fontSize: "13px" }}>Already registered? Login Here</Link>
                    </EuiButtonEmpty>
                </EuiForm>
            </div>
        )
    }
}

export default RegisterUser