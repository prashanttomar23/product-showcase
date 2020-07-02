import React, { Component, Fragment } from 'react'
import '../../App.css'
import { EuiFieldText, EuiModalHeaderTitle, EuiModalHeader, EuiModalBody, EuiModalFooter, EuiOverlayMask, EuiModal, EuiButtonEmpty, EuiFormRow, EuiSpacer, EuiText, EuiButton, EuiFlexGroup, EuiFlexItem, EuiFieldPassword } from '@elastic/eui'
import axios from 'axios'

class ResetPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            isOTPModal: false,
            isPasswordModal:false,
            otp:null,
            otpEntered:null,
            password:null,
            repassword:null
        }
    }
    closeModal = () => {
        this.setState({isOTPModal: false}, () => {
            let tempArr = document.getElementsByClassName("euiOverlayMask")
            tempArr[0].parentElement.removeChild(tempArr[0])
        })
    }
    onEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        });
    };
    nextStep = () => {
        axios.post("http://localhost:8080/resetPassword/verify", { email: this.state.email })
            .then(res => {
                if (res.data.length == 0) window.alert("User with given email address not found")
                else this.showOTPModal(res.data)

            })
    }
    showOTPModal = (data) => {
        console.log(data)
        this.setState({ isOTPModal: true,
        otp:this.getOtp(data)},()=>setTimeout(this.resetOTP(), 600000))
    }
    resetOTP=()=>{
        this.setState({otp:null})
    }
    getOtp=(data)=>{
        let a='' ;
        for(let i=0;i<6;i++) a+=String(parseInt(10*Math.random()))
        axios.post("http://localhost:8080/resetPassword/sendOTP",{email:data.email,opt:a})
        return(a)
    }    
    onOTPChange=(e)=>{
        this.setState({otpEntered:e.target.value})
    }
    validateOTP=()=>{
        if(this.state.otp===this.state.otpEntered){
            this.closeModal();
            this.setState({isPasswordModal:true})
            console.log(this.state.otp,"optp",this.state.otpEntered);   
        }

        else window.alert("Invalid Code")
    }
    onPasswordChange=(e)=>{
        this.setState({password:e.target.value})
    }
    onRePasswordChange=(e)=>{
        this.setState({repassword:e.target.value})
    }   
    savePassword=()=>{
        if(this.state.password===this.state.repassword){
            axios.post("http://localhost:8080/resetPassword/new",{email:this.state.email,password:this.state.password})
            .then(res=>{
                console.log(res)
                window.alert("Password Changed Successfully")
            })
        }
        else{
            window.alert("pasword doenrt mathc")
        }
    }
    closePasswordModal=()=>{
        this.setState({isPasswordModal: false}, () => {
            let tempArr = document.getElementsByClassName("euiOverlayMask")
            tempArr[0].parentElement.removeChild(tempArr[0])
        })
    }
    render() {
        let otpModal,passwordModal;
        if (this.state.isOTPModal === true) {
            otpModal = <EuiOverlayMask>
                <EuiModal onClose={this.closeModal}>
                    <EuiModalHeader >
                        <EuiModalHeaderTitle style={{fontSize:"21px"}}>A code has been sent to your Email</EuiModalHeaderTitle>
                    </EuiModalHeader>
                    <EuiModalBody>
                        <EuiFormRow label="Enter Confirmation Code" compressed={true} onChange={this.onOTPChange}>
                            <EuiFieldText />
                        </EuiFormRow>.
                    </EuiModalBody>
                    <EuiModalFooter>
                        <EuiButtonEmpty onClick={this.closeModal}>Cancel</EuiButtonEmpty>
                        <EuiButton onClick={this.validateOTP}>Next</EuiButton>
                    </EuiModalFooter>
                </EuiModal>
            </EuiOverlayMask>
        }
        if (this.state.isPasswordModal === true) {
            passwordModal = <EuiOverlayMask>
                <EuiModal onClose={this.closePasswordModal}>
                    <EuiModalHeader >
                        <EuiModalHeaderTitle style={{fontSize:"21px"}}>A code has been sent to your Email</EuiModalHeaderTitle>
                    </EuiModalHeader>
                    <EuiModalBody>
                        <EuiFormRow label="Enter New Password" compressed={true} onChange={this.onPasswordChange}>
                            <EuiFieldPassword />
                        </EuiFormRow>
                        <EuiFormRow label="Re-Enter New Password" compressed={true} onChange={this.onRePasswordChange}>
                            <EuiFieldPassword />
                        </EuiFormRow>
                    </EuiModalBody>
                    <EuiModalFooter>
                        <EuiButtonEmpty onClick={this.closePasswordModal}>Cancel</EuiButtonEmpty>
                        <EuiButton onClick={this.savePassword}>Reset</EuiButton>
                    </EuiModalFooter>
                </EuiModal>
            </EuiOverlayMask>
        }
        let showLayout = (
            <div className="loginPage">
                <EuiText size={"m"} textAlign={"center"} color={"accent"}>Reset Password</EuiText>
                <EuiSpacer size={"l"} />
                <EuiFormRow label="Enter Valid Email" onChange={this.onEmailChange}>
                    <EuiFieldText />
                </EuiFormRow>
                <EuiSpacer size={"l"} />
                <EuiFlexGroup justifyContent={"spaceBetween"}>
                    <EuiFlexItem grow={false}>
                        <EuiButton color={"text"}><a href="http://localhost:3000">Back To Login</a></EuiButton>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiButton color={"secondary"} onClick={this.nextStep} fill>Next</EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>

            </div>
        )
        return (
            <Fragment>
                {showLayout}
                {otpModal}
                {passwordModal}
            </Fragment>
        )
    }
}

export default ResetPassword
