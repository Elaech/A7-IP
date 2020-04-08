import React, {Component} from 'react'
import logo from './final-logo.png'

import LoginForm from '../LoginFormComponents/LoginForm';

class LoginFormLayout extends Component {
    
    render() {
        
        return (
          <div>
          
               <div className= "logo">
              
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