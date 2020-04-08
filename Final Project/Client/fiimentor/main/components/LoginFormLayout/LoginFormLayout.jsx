import React, {Component} from 'react'
import logo from './final-logo.png'
import './LoginPageLayout.css';
import LoginForm from '../LoginFormComponents/LoginForm';

class LoginFormLayout extends Component {

    render() {
        
        return (
            
            

            <div>

            <div className = "logofinal-div">

              <img src={logo} />


          </div>
          <div className = "LoginForm" >
          <LoginForm />
          </div>
          </div>
        )
    }
}

export default LoginFormLayout
