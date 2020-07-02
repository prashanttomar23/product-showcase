import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom";
import {
    EuiButton,
    EuiModalBody,
    EuiModalFooter,
    EuiButtonEmpty,
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiOverlayMask,
    EuiText,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSelect,
    EuiFieldText,
    EuiFormRow,
} from '@elastic/eui'



export class BuyButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalVisible: false,
            isPaymentModalVisible: false,
            type: null,
            cardID: null,
            mobileNumber: null,
        }
    }
    closeModal = () => {
        
        this.setState({
            isModalVisible: false,
            type: null
        }, () => {
            let tempArr = document.getElementsByClassName("euiOverlayMask")
            tempArr[0].parentElement.removeChild(tempArr[0])
        })
    }
    closeGuestModal = () => {
        window.localStorage.setItem("guestInv",JSON.stringify(this.props.inventoryItems))
        this.setState({
            isModalVisible: false,
            type: null
        }, () => {
            let tempArr = document.getElementsByClassName("euiOverlayMask")
            tempArr[0].parentElement.removeChild(tempArr[0])
        })
    }
    closePaymentModal = () => {
        this.setState({
            isPaymentModalVisible: false,
            type: null
        }, () => {
            let tempArr = document.getElementsByClassName("euiOverlayMask")
            tempArr[0].parentElement.removeChild(tempArr[0])
        })
    }
    continuePaymentModal = () => {
        if (this.state.type === null) {
            window.alert("Payment Option is Required")
        }
        else {
            this.setState({
                isPaymentModalVisible: false,
            }, () => {
                let tempArr = document.getElementsByClassName("euiOverlayMask")
                tempArr[0].parentElement.removeChild(tempArr[0])
            })
        }
    }
    showModal = () => this.setState({ isModalVisible: true, isPaymentModalVisible: false })
    proceedToPay = () => this.setState({ isModalVisible: false, isPaymentModalVisible: true })
    onPaymentMethodChange = (e) => this.setState({ type: e.target.value })
    onCardIDChange = (e) => this.setState({ cardID: e.target.value })
    onMobileNumberChange = (e) => this.setState({ mobileNumber: e.target.value })

    payBill = (amountTotal) => {
        if (this.state.mobileNumber == null || this.state.cardID == null) window.alert("All fields are required")
        else if (this.state.mobileNumber.length != 10 || this.state.cardID.length < 10) window.alert("Invalid Details")
        else {
            let currentTime = new Date().toLocaleString()

            let accountInfo = {
                cardID: this.state.cardID,
                mobileNumber: this.state.mobileNumber,
                purchasedTime: currentTime,
                paymentMethod: this.state.type,
                totalAmount: amountTotal,
            }
            this.props.paidBill(accountInfo)
            this.closePaymentModal();
        }

    }

    render() {
        let user = JSON.parse(window.localStorage.getItem("currentUser"));
        let modal, items, labelText, amountTotal = 0;
        if (user.role === "Guest") {
            if (this.state.isModalVisible) {
                modal = (
                    <EuiOverlayMask>
                        <EuiModal onClose={this.closeModal}>
                            <EuiModalHeader >
                                <EuiModalHeaderTitle>Please Login To Continue</EuiModalHeaderTitle>
                            </EuiModalHeader>
                            <EuiModalBody>
                            </EuiModalBody>
                            <EuiModalFooter>
                                <EuiButtonEmpty onClick={this.closeModal}>Cancel</EuiButtonEmpty>
                                <EuiButton onClick={this.closeGuestModal}>
                                    <a href="http://localhost:3000/">Login Here</a>
                                </EuiButton>
                            </EuiModalFooter>
                        </EuiModal>
                    </EuiOverlayMask>
                )
            }

        }
        else {
            const options = [
                { value: 'Credit Card', text: 'Credit Card' },
                { value: 'Debit Card', text: 'Debit Card' },
                { value: 'Bhim-Upi ID', text: 'Bhim-Upi' }]
            items = this.props.inventoryItems;
            if (items !== null) {
                items.forEach(item => {
                    amountTotal += (item.price) * (item.quantity);
                });
            }
            labelText = `Enter ${this.state.type} Number.`
            //console.log(items,amountTotal)
            if (this.state.isModalVisible) {
                modal = (
                    <EuiOverlayMask>
                        <EuiModal onClose={this.closeModal}>
                            <EuiModalHeader>
                                <EuiModalHeaderTitle>Total: {amountTotal} Rs.</EuiModalHeaderTitle>
                            </EuiModalHeader>
                            <EuiModalBody>{items.map(item => {
                                return (
                                    <EuiFlexGroup justifyContent={"spaceBetween"}>
                                        <EuiFlexItem grow={false}><EuiText>{item.quantity} {item.name}<EuiText size={"xs"} color={"secondary"}>@{item.price}/-</EuiText></EuiText></EuiFlexItem>
                                        <EuiFlexItem grow={false}><EuiText>{item.price * item.quantity}</EuiText></EuiFlexItem>
                                    </EuiFlexGroup>
                                )
                            })}
                            </EuiModalBody>
                            <EuiModalFooter>
                                <EuiButtonEmpty onClick={this.closeModal}>Cancel</EuiButtonEmpty>
                                <EuiButton onClick={this.proceedToPay} fill>
                                    Pay {amountTotal}/-
                            </EuiButton>
                            </EuiModalFooter>
                        </EuiModal>
                    </EuiOverlayMask>
                );
            }
            ////----------------------------type of payment options modals--
            if (this.state.isPaymentModalVisible) {
                modal = (
                    <EuiOverlayMask>
                        <EuiModal onClose={this.closePaymentModal}>
                            <EuiModalHeader>
                                <EuiModalHeaderTitle>Select a Payment Option:</EuiModalHeaderTitle>
                            </EuiModalHeader>
                            <EuiModalBody>
                                <EuiSelect required={true} hasNoInitialSelection={true} onChange={this.onPaymentMethodChange} compressed={true} options={options}></EuiSelect>
                            </EuiModalBody>
                            <EuiModalFooter>
                                <EuiButtonEmpty onClick={this.closePaymentModal}>Cancel</EuiButtonEmpty>
                                <EuiButton onClick={this.continuePaymentModal} fill>
                                    Continue:
                        </EuiButton>
                            </EuiModalFooter>
                        </EuiModal>
                    </EuiOverlayMask>
                )
            }
            if (this.state.type !== null) {
                modal = (
                    <EuiOverlayMask>
                        <EuiModal onClose={this.closePaymentModal}>
                            <EuiModalHeader>
                                <EuiModalHeaderTitle>Enter Details</EuiModalHeaderTitle>
                            </EuiModalHeader>
                            <EuiModalBody>
                                <EuiFormRow label={labelText} onChange={this.onCardIDChange}>
                                    <EuiFieldText />
                                </EuiFormRow>
                                <EuiFormRow label="Enter Mobile No." onChange={this.onMobileNumberChange}>
                                    <EuiFieldText />
                                </EuiFormRow>
                            </EuiModalBody>
                            <EuiModalFooter>
                                <EuiButtonEmpty onClick={this.closePaymentModal}>Cancel</EuiButtonEmpty>
                                <EuiButton onClick={() => this.payBill(amountTotal)} fill>
                                    Pay {amountTotal} /-
                            </EuiButton>
                            </EuiModalFooter>
                        </EuiModal>
                    </EuiOverlayMask>
                )
            }
        }

        return (
            <Fragment>
                <EuiButton onClick={this.showModal}>
                    Proceed to Buy
                </EuiButton>
                {modal}
            </Fragment>
        )
    }
}

export default BuyButton
