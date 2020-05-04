import React from 'react';
import {SideBar} from './Generics/SideBar/SideBar';
import {SiteContainer, StyledContainer} from '../globalStyledVariables';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <>
            <SiteContainer>
                <StyledContainer>
                    <SideBar/>
                    <main>{props.children}</main>
                </StyledContainer>
            </SiteContainer>
        </>
    );
};

export default Layout;
