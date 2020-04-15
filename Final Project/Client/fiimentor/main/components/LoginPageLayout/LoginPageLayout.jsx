import React, {Component} from 'react'
import {LoginForm} from '../LoginFormComponents/LoginForm';
import {Logo} from '../../globalStyledVariables';

import './LoginPageLayout.css';
import ModalComponent from '../Generics/Modal/Modal';
import {RegisterForm} from '../RegisterFormComponents/RegisterForm';
import Button from '@material-ui/core/Button';

interface State {
    isRegisterModalOpen:boolean;
}

class LoginPageLayout extends Component<{}, State> {
    constructor() {
        super();

        this.state = {
            isRegisterModalOpen: false,
        };
    }

    closeRegisterModal = ()=> {
        this.setState({isRegisterModalOpen: false});
    };

    openRegisterModal = ()=> {
        this.setState({isRegisterModalOpen: true});
    };

    render() {
        return (
            <div>
                <div className="LogoContainer">
                    <Logo/>
                </div>
                <div className="LoginFormContainer">
                    <ModalComponent
                        toggle={this.closeRegisterModal}
                        isOpen={this.state.isRegisterModalOpen}
                        title="Inregistrare">
                        <RegisterForm/>
                    </ModalComponent>
                    <LoginForm/>
                    <Button
                        onClick={this.openRegisterModal}
                        type="button"
                        color="inherit"
                        className="registerButton"
                    >
                        Nu ai cont? Inregistreaza-te
                    </Button>
                </div>
            </div>
        )
    }
}

export default LoginPageLayout
