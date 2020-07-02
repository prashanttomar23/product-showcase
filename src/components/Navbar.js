import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { EuiButtonEmpty } from '@elastic/eui'
import Axios from 'axios';



export class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "Guest",
            role: "Guest"
        }

    }
    componentDidMount() {
        fetch("http://localhost:8080/currentuser")
            .then((result) => result.json())
            .then((res) => {
                if (res[0] !== undefined) {
                    let user = {
                        name: res[0].name,
                        role: "User",
                        email: res[0].email,
                    }
                    window.localStorage.setItem("currentUser", JSON.stringify(user));
                    //console.log(user)

                }
                let userCurrent = JSON.parse(window.localStorage.getItem("currentUser"))
                //console.log("from mount", userCurrent)
                this.setState({
                    name: userCurrent.name,
                    role: userCurrent.role
                })
                //window.alert("Logged in Succesfully")
            })

    }
    logout = () => {
        let user = {
            name: "Guest",
            role: "Guest"
        }
        window.localStorage.setItem("currentUser", JSON.stringify(user))
        Axios.get("http://localhost:8080/deleteuser")
        window.alert("logged out successfully")
    }
    render() {
        const ourProducts = <EuiButtonEmpty className="navbar-item">
            <Link to="/products" className="nav-link">Our Products</Link>
        </EuiButtonEmpty>

        const userList = <EuiButtonEmpty className="navbar-item">
            <Link to="/showUsers" className="nav-link">User List</Link>
        </EuiButtonEmpty>

        const addProduct = <EuiButtonEmpty className="navbar-item">
            <Link to="/addProduct" className="nav-link">Add New Product</Link>
        </EuiButtonEmpty>

        const inventory = <EuiButtonEmpty className="navbar-item">
            <Link to="/Inventory" className="nav-link">Inventory</Link>
        </EuiButtonEmpty>

        const orderHistory = <EuiButtonEmpty className="navbar-item">
            <Link to="/orderHistory" className="nav-link">Order History</Link>
        </EuiButtonEmpty>

        const logout = <EuiButtonEmpty onClick={this.logout} className="navbar-item">
            <Link to="/" className="nav-link">Logout</Link>
        </EuiButtonEmpty>

        const title = <h2 size="l" className="navbar-brand" style={{ display: "flex", textDecoration: "underline", textAlign: "center" }}>Hello {this.state.name} ({this.state.role})</h2>


        if (this.state.role === "Admin" || this.state.role === "Manager") {
            return (
                <nav className="navbar navbar-light bg-light navbar-expand-lg">
                    {title}
                    <div className="collpase navbar-collapse">
                        {ourProducts}
                        {userList}
                        {addProduct}
                        {logout}
                    </div>
                </nav>
            )
        }
        else if (this.state.role === 'User') {
            return (
                <nav className="navbar navbar-light bg-light navbar-expand-lg">
                    {title}
                    <div className="collpase navbar-collapse">
                        {ourProducts}
                        {inventory}
                        {orderHistory}
                        {logout}
                    </div>
                </nav>
            )
        }
        else {
            return (
                <nav className="navbar navbar-light bg-light navbar-expand-lg">
                    <h2 size="l" className="navbar-brand" style={{ display: "flex", textDecoration: "underline", textAlign: "center" }}>Guest User</h2>
                    <div className="collpase navbar-collapse">
                        {ourProducts}
                        {inventory}
                        <EuiButtonEmpty size="s" style={{ marginLeft: "20px", padding: "1px" }} className="loginBtn">
                            <Link to="/register" className="nav-link">New User? Register Here</Link>
                        </EuiButtonEmpty>

                    </div>
                </nav>
            )

        }
    }
}

export default Navbar
//-----------------------
