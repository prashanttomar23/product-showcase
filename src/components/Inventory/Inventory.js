import React, { Component, Fragment } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Image from '../Product/Image'
import QuantityAdjust from './QuantityAdjust';
import Delete from '../Product/Delete'
import BuyButton from '../BuyButton'

export class Inventory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inventoryItems: [],
            emailUser: null,
            columnDefs: [
                {
                    headerName: "Item",
                    field: "name",
                    resizable: true,
                    width: 150,
                },
                {
                    headerName: "Company",
                    field: "companyTitle",
                    resizable: true,
                    width: 150,
                },
                {
                    headerName: "Price",
                    field: "price",
                    resizable: true,
                    width: 60,
                },
                {
                    headerName: "Quantity",
                    field: "quantity",
                    width: 100,
                    resizable: true,
                    cellRendererFramework: (params) => {
                        return <QuantityAdjust onChangeInQuantity={this.onChangeInQuantity} rowData={params} />;
                    },
                },
                {
                    headerName: "id",
                    field: "_id",
                    hide: true,
                },

                {
                    headerName: "Action",
                    field: "profile_delete",
                    resizable: true,
                    resizable: true,
                    width: 59,
                    cellRendererFramework: Delete,
                    cellRendererParams: {
                        callBackDelete: this.callBackDeleteProduct,
                    },
                },
            ]
        }
    }
    onChangeInQuantity = (e, item) => {
        let items = this.state.inventoryItems
        //console.log(item,"item ehre",e) 
        for (let i = 0; i < items.length; i++) {
            if (items[i]._id === item._id) {
                items[i].quantity = e
                break
            }
        }
        this.setState({
            inventoryItems: items
        },
            () => {
                let user = JSON.parse(window.localStorage.getItem("currentUser"));
                user.inventoryItems = this.state.inventoryItems

                axios.post("http://localhost:8080/inventory/edit", user)
                //console.log(this.state.inventoryItems, "inv items")
            })
        //console.log(items)

    }
    callBackDeleteProduct = () => {

        let selectedRow = this.gridApi.getSelectedRows();
        let id = selectedRow[0]._id;
        selectedRow[0].email = this.state.emailUser

        axios.put("http://localhost:8080/inventory/delete", selectedRow).then((res) => {
            if (res.status === 200) {
                this.gridApi.updateRowData({ remove: selectedRow });
            }
        });
    };
    paidBillCallback = (billInfo) => {

        let user = JSON.parse(window.localStorage.getItem("currentUser"));
        billInfo.email = user.email
        billInfo.data = this.state.inventoryItems;

        axios.post("http://localhost:8080/purchase", billInfo)
            .then((res) => {
                if (res.data == "OK") {
                    window.alert("Purchase Succesfull")
                    this.setState({ inventoryItems: [] }, () => {
                        user.inventoryItems = []
                        axios.post("http://localhost:8080/inventory/edit", user)
                        axios.post("http://localhost:8080/api/products/editStock", billInfo.data)
                    })
                }
                else window.alert("Purchase failed, try again")

            })
    }
    componentDidMount() {
        let resData;
        let user = JSON.parse(window.localStorage.getItem("currentUser"));
        
        this.setState({ emailUser: user.email })

        axios.post("http://localhost:8080/inventory/my", user)
            .then(res => {
                if (res.data !== "Not found") resData = res.data
                else {
                    resData=[]
                    this.setState({ inventoryItems: [] })
                }
            })
        axios.get("http://localhost:8080/api/products/")
            .then(result => {
                console.log(result, "result here")
                resData.forEach(element => {
                    for (let i = 0; i < result.data.length; i++) {
                        if (element.name === result.data[i].name) {
                            element.stock = result.data[i].stockAvailable
                            if (element.quantity > element.stock) {
                                element.quantity = element.stock
                                window.alert(`${element.name} is not available,Quantity reduced to max unit`)
                            }
                            console.log(element.stock, result.data[i].stockAvailable)
                        }
                    }
                });
            })
            .then(() => console.log("after", resData))
            .then(() => this.setState({ inventoryItems: resData }))
            .then(()=> {
                let data={}
                data.inventoryItems=resData
                data.email=user.email
                axios.post("http://localhost:8080/inventory/edit",data)
            })

    }


    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    render() {
        let buyButton;
        if (this.state.inventoryItems.length > 0) {
            buyButton = <BuyButton inventoryItems={this.state.inventoryItems} paidBill={this.paidBillCallback} />
        }
        return (
            <Fragment>
                <Navbar />
                <div className="ag-theme-balham"
                    style={{
                        height: "50vh",
                        width: "80%",
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.inventoryItems}
                        onGridReady={this.onGridReady}
                        rowSelection="single"
                        animateRows="true" />
                    {buyButton}
                </div>
            </Fragment>
        )
    }
}

export default Inventory
