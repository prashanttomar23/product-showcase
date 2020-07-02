import { EuiButtonIcon, EuiButton, EuiPopover, EuiForm, EuiFormRow, EuiFieldText, EuiFieldNumber } from '@elastic/eui';
import React, { Component } from 'react'
import axios from 'axios'

class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isPopoverOpen: false,
            productName: "",
            productPrice: 0,
            productCompany:"",
            stockAvailable:0,
            id: null
        }
    }
    onProductNameChange = (e) => {
        this.setState({
            productName: e.target.value
        })
    }
    onProductCompanyChange = (e) => {
        this.setState({
            productCompany: e.target.value
        })
    }
    onProductPriceChange = (e) => {
        this.setState({
            productPrice: e.target.value
        })
    }
    onStockAvailableChange = (e) => {
        this.setState({
            stockAvailable: e.target.value
        })
    }

    onEdit = (e) => {
        //console.log(e.target, "from on edit")
        this.setState({
            isPopoverOpen: !this.state.isPopoverOpen

        })
    }
    closePopover = () => {
        this.setState({
            isPopoverOpen: false
        })
    }

    render() {
        const button = (
            <EuiButtonIcon  iconType="pencil" onClick={this.onEdit}>
            </EuiButtonIcon>
        );
            //console.log(this.props,"from edit comp")
        // const { callBackEditUser } = this.props

            // let selectedRow=this.gridApi.getSelectedRows()
            // let id= selectedRow[0]._id
        const product = {
            name: this.state.productName,
            price: this.state.productPrice,
            companyTitle:this.state.productCompany,
            stockAvailable:this.state.stockAvailable,
        }
        //console.log(product,"product hree")
            //callBackEditUser(product0
        
        return (
            
            <EuiPopover
                button={button}
                isOpen={this.state.isPopoverOpen}
                closePopover={this.closePopover}>
                <EuiForm component="form">
                    <EuiFormRow label="Product Name">
                        <EuiFieldText onChange={this.onProductNameChange} />
                    </EuiFormRow>
                    <EuiFormRow label="Company">
                        <EuiFieldText onChange={this.onProductCompanyChange} />
                    </EuiFormRow>
                    <EuiFormRow label="Price">
                        <EuiFieldNumber onChange={this.onProductPriceChange} />
                    </EuiFormRow>
                    <EuiFormRow label="Stock">
                        <EuiFieldNumber onChange={this.onStockAvailableChange} />
                    </EuiFormRow>
                    <EuiFormRow>
                        <EuiButton onClick={(e)=>{
                            // this.setState({
                            //     isPopoverOpen: !this.state.isPopoverOpen
                            // })
                            this.onEdit(e);
                            this.props.callBackEdit(product)

                            }}>Update</EuiButton>
                    </EuiFormRow>
                </EuiForm>
            </EuiPopover>
        )
    }
}

export default Edit





