import React, { Component } from 'react'

class Image extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             image:"none"
        }
        
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));       
        bytes.forEach((b) => binary += String.fromCharCode(b));       
        return window.btoa(binary);
    };
    componentDidMount() {
        fetch('http://localhost:8080/api/products')
            .then((res) => res.json())
            .then(data => {
                 //console.log(data[4].image)       
                let base64Flag = 'data:image/png;base64,';
                if(this.props.rowData!=undefined){
                    let imageStr = this.arrayBufferToBase64(this.props.rowData.data.data) ;  
                    this.setState({image: base64Flag + imageStr})
                } 
            })
        }
    
    render() {
        const image= this.state.image
        //console.log(this.state.image)
        //console.log("prosp from para",this.props.rowData)
        return (
            <div>
                <img src={image} alt="image" style={{height:"20px"}}></img>    
            </div>
        )
    }
}

export default Image
