import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import "../../App.css";

export class RegisterWithFacebook extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    responseFacebook = (res) => {
        console.log(res, "frpm res with fb");
        if (res.status !== "unknown") {
            console.log("res", res);
            let user = {
                name: res.name,
                role: "User"
            }
            window.localStorage.setItem("currentUser", JSON.stringify(user));
            window.alert("Logged in Succesfully")
            window.location.href = "http://localhost:3000/products";

        }
        else {
            window.alert("Login failed")
        }
    };
    componentClicked = () => {
        console.log("clicked");
    };
    render() {
        let fbContent = (
            <FacebookLogin
                appId="1124461821238736"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook}
                onClick={this.componentClicked}
                size="small"
                icon="fa-facebook"
                textButton={"Continue with Facebook"}
                cssClass={"facebookBtn"}


            />
        );
        return <div>{fbContent}</div>;
    }
}

export default RegisterWithFacebook;
