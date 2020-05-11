import React from 'react';
import {Sidebar} from './Generics/SideBar/SideBar';
import {Logo, SiteContainer, StyledContainer, GlobalStyle} from '../globalStyledVariables';
import {Header} from './Header/Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <>
            <GlobalStyle />
            <SiteContainer>
                <Header />
                <div className="blue-band" />
                <StyledContainer>
                    <Sidebar/>
                    <main>{props.children}</main>
                </StyledContainer>
            </SiteContainer>
        </>
    );
};

export default Layout;
