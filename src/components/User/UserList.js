import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Navbar from '../Navbar'
import Delete from '../Product/Delete'
import axios from 'axios'



export class UserList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            role: "Guest",
            columnDefs: [
                {
                    headerName: "Name", field: "name", resizable: true,
                    width: 150,
                },
                {
                    headerName: "Email Id", field: "email", resizable: true,
                    width: 250,
                },
                {
                    headerName: "Role", field: "role",
                    resizable: true,
                    width: 80,
                },
                {
                    headerName: "Actions", field: "profile_image",
                    resizable: true, resizable: true,
                    width: 65,
                    cellRendererFramework: Delete,
                    cellRendererParams: {
                        callBackDelete: this.deleteUser
                    }

                },

            ],
            rowData: [],
        }
    }
    deleteUser = () => {
        let selectedRow = this.gridApi.getSelectedRows()
        let id = selectedRow[0]._id
        console.log(selectedRow[0])
        axios.delete("http://localhost:8080/api/users/" + id)
            .then(res => {
                if (res.status === 200) {
                    this.gridApi.updateRowData({ remove: selectedRow })
                }
                window.alert(`${selectedRow[0].role} ${selectedRow[0].name} Deleted Successfully`)
            })
    }
    componentDidMount() {
        let user = JSON.parse(window.localStorage.getItem("currentUser"))
        console.log("role fron aggrid", user)
        fetch('http://localhost:8080/api/users')
            .then(result => result.json())
            .then(json => this.setState({
                rowData: json,
                role: user.role
            }, () => {
                console.log(user.role, "from userlist role")
                if (user.role === "Manager" || user.role === "User" || user.role === "Guest") {
                    this.gridColumnApi.setColumnVisible("profile_image", false)
                }
                else if (user.role === "Admin") {
                    this.gridColumnApi.setColumnVisible("profile_image", true)
                }
            }))
    }
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }
    render() {
        let user = JSON.parse(window.localStorage.getItem("currentUser"))
        if (user.role !== "Guest")
            return (
                <div><Navbar></Navbar>
                    <div
                        className="ag-theme-balham"
                        style={{
                            height: '70vh',
                            width: '90%'
                        }}
                    >

                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            onGridReady={this.onGridReady}
                            rowSelection="single"
                            animateRows="true">
                        </AgGridReact>
                    </div>
                </div>
            )
        return (<div>Access Denied</div>)
    }
}

export default UserList
