import React, { Component } from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '@elastic/eui/dist/eui_theme_light.css';
import { BrowserRouter as Router,Route} from 'react-router-dom';

import LoginUser from './components/User/LoginUser'
import RegisterUser from './components/User/RegisterUser'
import UserList from './components/User/UserList';
import AddNewProduct from './components/Product/AddNewProduct';
import AgGrid from './components/Product/AgGrid'
import Inventory from './components/Inventory/Inventory';
import OrderHistory from './components/OrderHistory';
import ResetPassword from './components/User/ResetPassword';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  render() {
    return (
      <div>
          <Router>
            <Route path="/" exact component={LoginUser} />
            <Route path="/register" component={RegisterUser} />
            <Route path="/showUsers" component={UserList} />
            <Route path="/addProduct" component={AddNewProduct} />
            <Route path="/products"  component={AgGrid} />
            <Route path="/inventory" component={Inventory} />
            <Route path="/guest" component={AgGrid} />
            <Route path="/backToLogin" component={LoginUser} />
            <Route path="/orderHistory" component={OrderHistory} />
            <Route path="/resetPassword" component={ResetPassword} />
            
          </Router>  
      </div>
      
    )
  }
}
export default App

