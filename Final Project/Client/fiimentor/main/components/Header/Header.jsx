import React from 'react';
import {LogoHome} from '../../globalStyledVariables';
import {HeaderStyles, LogoContainer} from './HeaderStyles';

export class Header extends React.Component<> {
    render() {
        return (
            <HeaderStyles>
                <LogoContainer>
                    <LogoHome/>
                </LogoContainer>
            </HeaderStyles>
        );
    }
}
