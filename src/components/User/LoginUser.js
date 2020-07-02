import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { RegisterWithGoogle } from "./RegisterWithGoogle";
import RegisterWithGitHub from "./RegisterWithGitHub";
import { RegisterWithFacebook } from "./RegisterWithFacebook";

import "../../App.css";
import {
  EuiFieldText,
  EuiFormRow,
  EuiButton,
  EuiForm,
  EuiFieldPassword,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";


export class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }
  loginAsGuest = () => {
    let user = {
        name: "Guest",
        role: "Guest"
    }
    window.localStorage.setItem("currentUser", JSON.stringify(user))
    axios.get("http://localhost:8080/deleteuser")

  }
  login = (e) => {
    //console.log("from adduser",e)
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.post("http://localhost:8080/auth", user).then((res) => {

      if (res.status == "200" && res.data != "400" && res.data != "401") {
        console.log(res.data);
        window.alert("Logged in Successfully");
        let user = JSON.stringify(res.data);
        window.localStorage.setItem("currentUser", user);
        window.location.href = "http://localhost:3000/products";
      }
      else if (res.data == "400") {
        window.alert("Email Id doesn't exists");
      }
      else if (res.data == "401") {
        window.alert("Ivalid Credentials");
      }
    });
  };
  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };


  render() {
    return (
      <div className="loginPage">
        <h1
          style={{
            textAlign: "center",
          }}
        >

          Login
        </h1>
        <EuiForm component="form">

          <EuiFormRow label="Email Id" onChange={this.onEmailChange}>
            <EuiFieldText />
          </EuiFormRow>

          <EuiFormRow label="Password" onChange={this.onPasswordChange}>
            <EuiFieldPassword />
          </EuiFormRow>

          <EuiSpacer />

          <EuiFlexGroup justifyContent={"spaceBetween"} alignItems={"center"}>

            <EuiFlexItem grow={false}>
              <EuiButton size="s" className="loginBtn" onClick={this.login}>
                Login
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                size="s"
                style={{
                  marginLeft: "20px",
                  padding: "1px",
                }}
                className="loginBtn"
              >
                <Link
                  to="/resetPassword"
                  style={{
                    fontSize: "15px",
                  }}
                  className="nav-link"
                >
                  Forget Password
                </Link>
              </EuiButtonEmpty>
            </EuiFlexItem>

          </EuiFlexGroup>
          
          <EuiFlexGroup
            direction={"column"}
            justifyContent={"spaceEvenly"}
            alignItems={"center"}
            paddingBottom="30px"
          >
            <EuiFlexItem>
              <EuiText> OR </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                size="s"
                style={{
                  marginLeft: "20px",
                  padding: "1px",
                }}
                className="loginBtn"
              >
                <Link
                  to="/register"
                  style={{
                    fontSize: "15px",
                  }}
                  className="nav-link"
                >
                  New User ? Register Here
                </Link>
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton style={{ width: "200px", borderRadius: "1px", borderColor: "primary" }} size="s" className="loginBtn" onClick={this.loginAsGuest}>
                <Link to="/guest">Login as Guest</Link> 
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
              <Link to="/OAuth/Google">
                <RegisterWithGoogle />
              </Link>
            </EuiFlexItem>
            <EuiFlexItem
              style={{ width: "200px", borderRadius: "1px", borderColor: "primary" }}
            >
              <RegisterWithFacebook />
            </EuiFlexItem>
            <EuiFlexItem>
              <RegisterWithGitHub />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
      </div>
    );
  }
}

export default LoginUser;
