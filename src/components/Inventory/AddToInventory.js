import React, { Component, Fragment } from 'react'
import axios from 'axios'
import {
    EuiButtonIcon,
    EuiButton,
    EuiModal,
    EuiOverlayMask,
    EuiModalHeader,
    EuiModalFooter,
    EuiModalBody,
    EuiModalHeaderTitle,
    EuiText,
    EuiButtonEmpty,
    EuiForm,
    EuiFieldText,
    EuiFieldNumber,
    EuiSpacer,
}
    from '@elastic/eui'

export class AddToInventory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalVisible: false,
            productQuantity: null,
            currentQuantity: null,
        }
    }
    addToInventory = () => {
        let data = this.props.rowData.data
        let myInventory;
        console.log(this.state.productQuantity, "data inv", data)
        let user = JSON.parse(window.localStorage.getItem("currentUser"))
        let inventoryData = {
            user: user,
            inventoryItem: {
                name: data.name,
                price: data.price,
                companyTitle: data.companyTitle,
                stock: data.stockAvailable,
                quantity: this.state.productQuantity
            }
        }


        //console.log(myInventory,"myinv")
        let q = this.state.productQuantity
        if (q === null || q <= 0) {
            window.alert("Quantity cannot be null")
        }
        else if (q > data.stockAvailable) {
            window.alert(`Quantity limit exceeded`)
        }
        else {

            axios.post("http://localhost:8080/inventory/my", user)
                .then(res => {
                    myInventory = res.data
                    //console.log("data fro axiss", data, myInventory)

                    if (myInventory.length == 0) {
                        axios.post("http://localhost:8080/inventory/add", inventoryData)
                            .then((result) => {
                                console.log(result)
                            })
                        this.closeModal();
                    }
                    else {
                        for (let i = 0; i < myInventory.length; i++) {
                            if (myInventory[i].name === data.name) {
                                if (q > data.stockAvailable - myInventory[i].quantity) {
                                    window.alert("Amount Exceeded as Product is already in inventory")

                                }
                                else {
                                    axios.post("http://localhost:8080/inventory/add", inventoryData)
                                        .then((result) => {
                                            console.log(result)
                                        })
                                    this.closeModal();
                                }
                                console.log(q, data.stockAvailable, myInventory[i].quantity)
                                break
                            }
                            else if (i === myInventory.length - 1) {
                                axios.post("http://localhost:8080/inventory/add", inventoryData)
                                    .then((result) => {
                                        console.log(result)
                                    })
                                this.closeModal();
                                break
                            }
                        }
                    }
                });

            // axios.post("http://localhost:8080/inventory/add", inventoryData)
            //     .then((result) => {
            //         console.log(result)
            //     })



            // this.closeModal();


        }
        //console.log(this.state.productQuantity)

    }

    onChangeQuantity = (e) => {
        this.setState({
            productQuantity: parseInt(e.target.value)
        })
    }
    closeModal = () => {
        this.setState({
            isModalVisible: false
        }, () => {
            let tempArr = document.getElementsByClassName("euiOverlayMask")
            tempArr[0].parentElement.removeChild(tempArr[0])
        })
    }
    showModal = () => {
        console.log(this.props.rowData.data)
        this.setState({
            isModalVisible: true
        })
    }

    render() {
        let secondaryColor, available;
        let data = this.props.rowData.data;
        if (data.stockAvailable == 0) {
            secondaryColor = "danger"
            available = "Not Available"
        }
        else if (data.stockAvailable <= 10) {
            secondaryColor = "warning"
            available = "Hurry up, Only few left."
        }
        else {
            secondaryColor = "secondary"
            available = "Available"
        }
        const button = (
            <EuiButtonIcon iconType="plusInCircle" onClick={this.showModal}>
            </EuiButtonIcon>
        );
        let modal;

        if (this.state.isModalVisible) {
            modal = (
                <EuiOverlayMask>
                    <EuiModal onClose={this.closeModal}>
                        <EuiModalHeader>
                            <EuiModalHeaderTitle>{data.name}</EuiModalHeaderTitle>
                        </EuiModalHeader>
                        <EuiModalBody>
                            <EuiText>
                                from {data.companyTitle} @{data.price} per unit.<EuiText size={"xs"} color={secondaryColor}>
                                    {available}</EuiText>
                            </EuiText>
                            <EuiSpacer></EuiSpacer>
                            <EuiFieldNumber onChange={this.onChangeQuantity}
                                placeholder="Add Quantity"
                                aria-label="Use aria labels when no actual label is in use" />
                        </EuiModalBody>
                        <EuiModalFooter>
                            <EuiButtonEmpty onClick={this.closeModal}>Cancel</EuiButtonEmpty>
                            <EuiButton onClick={this.addToInventory} fill>
                                Add to Inventory
                            </EuiButton>
                        </EuiModalFooter>
                    </EuiModal>
                </EuiOverlayMask>
            );
        }
        return (
            <Fragment>
                {button}
                {modal}
            </Fragment>
        )
    }
}

export default AddToInventory
