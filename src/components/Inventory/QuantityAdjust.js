import React, { Component, Fragment } from 'react'
import { EuiFieldNumber } from '@elastic/eui'
import axios from 'axios'

export class QuantityAdjust extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             productQuantity:null
        }
    }
    onChangeQuantity=(e)=>{
        if(e.target.value<1 ){
            window.alert("Quantity cannot be  0 or Delete the product")
        }
        else if(e.target.value>this.props.rowData.data.stock){
            window.alert("Error: Quantity Limit Exceed")

        }
        else{
        this.setState({
            productQuantity:parseInt(e.target.value)
        },()=>{
            let user = JSON.parse(window.localStorage.getItem("currentUser"));
            this.props.onChangeInQuantity(this.state.productQuantity,this.props.rowData.data)
            //console.log(user)
            
        })
        }
    }
    render() {
        let data = (this.props.rowData.data)
        //console.log(data,"-----")
        let quantity=this.state.productQuantity||data.quantity
        return (
            <Fragment>
                <EuiFieldNumber
                    aria-label="Use aria labels when no actual label is in use"
                    value={quantity}
                    compressed={true}
                    onChange={this.onChangeQuantity} />
            </Fragment>
        )
    }
}

export default QuantityAdjust
