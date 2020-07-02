import React, { Component, Fragment } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import jsPDF from 'jspdf'
import { EuiAccordion, EuiText, EuiButtonEmpty, EuiSpacer } from '@elastic/eui'



export class OrderHistory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bills: []
        }
    }
    downloadBill = (bill) => {
        let doc = new jsPDF();
        doc.text(30, 30, `Amount Paid ${bill.totalAmount}`)
        doc.save('Bill.pdf');
    }

    componentDidMount() {
        let user = JSON.parse(window.localStorage.getItem("currentUser"));
        axios.post("http://localhost:8080/purchase/getBills", user)
            .then(res => {
                this.setState({ bills: res.data })
            })
    }

    render() {
        let bills = this.state.bills.map(bill => {
            console.log(bill.purchasedTime)
            return (
                <div>
                    <EuiAccordion
                        id={bill._id}
                        buttonContent={`${bill.items.length} item Purchased on ${bill.purchasedTime}`}
                        paddingSize={"xs"}
                        extraAction={<EuiButtonEmpty onClick={() => this.downloadBill(bill)} iconType="save">Download Bill</EuiButtonEmpty>}
                    >
                        <EuiText>Amount Paid {bill.totalAmount}</EuiText>
                        <EuiText>Payment Method {bill.paymentMethod}</EuiText>

                    </EuiAccordion>
                    <EuiSpacer size={"xs"} />
                </div>
            )
        });
        
        return (
            <Fragment>
                <Navbar />
                {bills}
            </Fragment>
        )
    }
}

export default OrderHistory
