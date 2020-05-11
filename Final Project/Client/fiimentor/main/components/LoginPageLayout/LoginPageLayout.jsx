import React, {Component} from 'react'
import {LoginForm} from '../LoginFormComponents/LoginForm';
import {LogoLogin} from '../../globalStyledVariables';

import './LoginPageLayout.css';
import ModalComponent from '../Generics/Modal/Modal';
import {RegisterForm} from '../RegisterFormComponents/RegisterForm';
import styled from 'styled-components';


interface State {
    isRegisterModalOpen: boolean;
}

const StyledButton = styled.button`
color: inherit;
border: 0;
position: fixed;
left: 33%;
margin-top:1rem;
`;

class LoginPageLayout extends Component<{}, State> {
    constructor() {
        super();

        this.state = {
            isRegisterModalOpen: false,
        };
    }

    closeRegisterModal = () => {
        this.setState({isRegisterModalOpen: false});
    };

    openRegisterModal = () => {
        this.setState({isRegisterModalOpen: true});
    };

    render() {
        return (
            <div>
                <div className="LogoContainer">
                    <LogoLogin/>
                </div>
                <div className="LoginFormContainer">
                    <ModalComponent
                        toggle={this.closeRegisterModal}
                        isOpen={this.state.isRegisterModalOpen}
                        title="Creare cont">
                        <RegisterForm/>
                    </ModalComponent>
                    <LoginForm/>
                    <StyledButton
                        className={''}
                        onClick={this.openRegisterModal}
                        type="button"
                    >
                        Nu ai cont? Inregistreaza-te
                    </StyledButton>
                </div>
            </div>
        )
    }
}

export default LoginPageLayout
