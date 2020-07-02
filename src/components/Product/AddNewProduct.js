import React, { Component } from 'react'
import axios from 'axios';
import Navbar from '../Navbar'
import {
    EuiFieldText,
    EuiForm,
    EuiFormRow,
    EuiButton,
    EuiFieldNumber,
    EuiFilePicker,
    
} from '@elastic/eui'



class AddNewProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productName: null,
            productPrice: null,
            productCompany: null,
            productImage:null,
            stockAvailable:null,
        }
    }
    onProductNameChange = (e) => {
        this.setState({
            productName: e.target.value
        })
    }
    onProductPriceChange = (e) => {
        this.setState({
            productPrice: e.target.value
        })
    }
    onProductCompanyChange = (e) => {
        this.setState({
            productCompany: e.target.value
        })
    }
    onStockAvailableChange=(e)=>{
        this.setState({
            stockAvailable:e.target.value
        })
    }
    // onProductImageChange =(e)=>{
    //     console.log(e[0].name)
    //     this.setState({
    //         productImage:e[0]
    //     })
    // }
    addProduct = (e) => {
        e.preventDefault();
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };
        const product = {
            name: this.state.productName,
            price: this.state.productPrice,
            companyTitle: this.state.productCompany,
            stockAvailable: this.state.stockAvailable,
            image:"none"
            //image: this.state.productImage
        }
        console.log(product)
        if (product.name === null || product.price === null || product.companyTitle === null || product.stockAvailable===null) {
            window.alert("All fields are required")
        }
        else {
            console.log((product))  
            axios.post("http://localhost:8080/api/products", product)
                .then(res => {
                    if (res.data =="200"  && res.data!="400"  && res.data!="401") {
                        window.alert(`${this.state.productName} added`)
                        window.location.href = "http://localhost:3000/addProduct"
                    }
                    else if(res.data =="400"){
                        window.alert("Product already exists")
                    }
                    else{
                        window.alert("invalid product entry")
                    }

                })
        }
    }
    render() {
        let user = JSON.parse(window.localStorage.getItem("currentUser"))
        if (user.role !== "Guest")
            return (
                <div>
                    <Navbar></Navbar>
                    <div style={{ maxWidth: 600, marginLeft: "25%", marginRight: "20%" }}>

                        <EuiForm action="http://localhost:8080/api/products/add" method="POST" component="form" encType="multipart/form-data" >
                            <EuiFormRow label="Product Name">
                                <EuiFieldText name="productName"onChange={this.onProductNameChange} />
                            </EuiFormRow>
                            <EuiFormRow label="Company">
                                <EuiFieldText name="productCompany" onChange={this.onProductCompanyChange} />
                            </EuiFormRow>
                            <EuiFormRow label="Price">
                                <EuiFieldNumber name="productPrice" onChange={this.onProductPriceChange} />
                            </EuiFormRow>
                            <EuiFormRow label="Stock">
                                <EuiFieldNumber name="stockAvailable" onChange={this.onStockAvailableChange} />
                            </EuiFormRow>
                            <EuiFormRow label="Upload Image">
                                <EuiFilePicker name="productImage" accept={"image/x-png,image/gif,image/jpeg"} onChange={this.onProductImageChange} display="small" initialPromptText="Upload an Image" />
                            </EuiFormRow>
                            <EuiFormRow>
                                <EuiButton  type="submit"  >Add</EuiButton>
                            </EuiFormRow>
                        </EuiForm>

                    </div>
                </div>
            )
        return (
            <div>Acces Denied</div>
        )
    }
}

export default AddNewProduct
