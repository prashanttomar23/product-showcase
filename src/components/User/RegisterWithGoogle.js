import React, { Component } from 'react'
import { GoogleLogin } from "react-google-login";

export class RegisterWithGoogle extends Component {
    render() {
        const responseGoogle = (response) => {
          console.log(response,"response from goofkke")
            if (response.Pt!==undefined) {
              let user = {
                name: response.Pt.Ad,
                role: "User",
              };
              console.log(response);
              window.localStorage.setItem("currentUser", JSON.stringify(user));
              window.alert("Logged in Succesfully");
              window.location.href = "http://localhost:3000/products";
            }
            else{
              window.alert("login failed")
            }
          };
        return (
                <GoogleLogin
                  style={{
                    fontSize: "15px",
                    color: "black",
                  }}
                  clientId="515568175699-0ttqfq13v0oh2h8o1fm6a809fambv44m.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  className="btnGoogle"
                  cookiePolicy={"single_host_origin"}
                >
                  <span>&nbsp;Continue with Google</span>
                </GoogleLogin> 
        )
    }
}

export default RegisterWithGoogle

