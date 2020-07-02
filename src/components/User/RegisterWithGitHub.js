import React, { Component } from "react";
import {EuiButton} from '@elastic/eui';
import axios from 'axios'

class RegisterWithGitHub extends Component {

    render() {
        return (
            <EuiButton
                style={{
                    fontSize: "15px",
                    color: "black",
                }}
                iconType="logoGithub"
                size="l"
                href="https://github.com/login/oauth/authorize?client_id=80e1c2081bb4edae9d50&scope=read:user"
            >
                Continue with Github
            </EuiButton>
        );
    }
}

export default RegisterWithGitHub;
