import React, {Component} from 'react'
import './LoginPageLayout.css';
import LoginForm from '../LoginFormComponents/LoginForm';
import { Logo } from '../../globalStyledVariables';

class LoginPageLayout extends Component {

    render() {
        return (
            <div>
            <div className = "LogoContainer">
              <Logo/>
          </div>
          <div className = "LoginFormContainer" >
          <LoginForm />
          </div>
          </div>
        )
    }
}

export default LoginPageLayout
