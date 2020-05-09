import React from 'react';
import {LogoHome} from '../../globalStyledVariables';
import {HeaderStyles, LogoContainer} from './HeaderStyles';
import {Button} from "@material-ui/core";
import {Context} from '../../Context';

export class Header extends React.Component<> {
    logout = () => {
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("user");
        sessionStorage.clear();
        
        console.log("Log out successful.")
        Context.routerService.replace('/');
    };

    render() {
        
        return (
            <HeaderStyles>
                <LogoContainer>
                    <LogoHome/>
                </LogoContainer>
                <Button variant="contained" size="large" onClick={this.logout}>Log out</Button>
            </HeaderStyles>
        );
    }
}
