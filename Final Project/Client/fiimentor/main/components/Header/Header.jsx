import React from 'react';
import {LogoHome} from '../../globalStyledVariables';
import {HeaderStyles, LogoContainer, UserName} from './HeaderStyles';
import {Button} from "@material-ui/core";
import {Context} from '../../Context';
import type {UserState} from '../../store/User/userReducer';
import type {AppState} from '../../store/AppState';
import {connect} from 'react-redux';

interface StateProps {
    user:UserState;
}

export class UnconnectedHeader extends React.Component<StateProps> {
    logout = () => {
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("user");
        sessionStorage.clear();

        Context.routerService.replace('/');
    };

    render() {
        const {user} = this.props;

        return (
            <HeaderStyles>
                <LogoContainer>
                    <LogoHome/>
                </LogoContainer>
                <UserName>{user? user.firstName + ' ' + user.lastName : '' }</UserName>
                <Button variant="contained" size="large" onClick={this.logout}>Log out</Button>
            </HeaderStyles>
        );
    }
}
const mapStateToProps = ({user}: AppState): StateProps => ({
    user,
});

export const Header = connect(mapStateToProps,null)(UnconnectedHeader);
