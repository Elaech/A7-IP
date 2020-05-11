import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';


export interface MenuItem {
    title: string;
    slug?: string;
    path?: string;
    menuList: MenuItem[];
}

const StyledSidebar = styled.div`
  grid-area: sidebar;
  box-shadow: 0 4px 0 4px #EFF8FA;
  

  .sticky {
    position: relative;
    top: 56px;
    height: calc(100vh - 121px - 1rem);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto;

    @supports ((position: -webkit-sticky) or (position: sticky)) {
      position: -webkit-sticky;
      position: sticky;
    }
  }
  .nav-container {
    padding: 0;
    padding-top: 8px;
    list-style: none;
    background-color: #fff;
  }

  .nav-item {
    padding: 0;
    margini: 0;

    a {
      color: #000;
      font-weight: 600;
    }

    a.active {
      background-color: #f2f2f2;
    }
  }
`;

export const Sidebar: React.FC = () => {
    const menu: MenuItem[] = [

                {
                    path: '/homepage',
                    title: 'Dashboard',
                    slug: 'dashboard',
                    menuList: [],
                },
                {
                    path: '/post/create',
                    title: 'Creeaza o postare',
                    slug: 'create',
                    menuList: [],
                },
                {
                    path: '/post/posts',
                    title: 'Postari',
                    slug: 'postari',
                    menuList: [],
                },

    ];

    return (
        <StyledSidebar>
            <ul className="nav-container sticky">
                {menu.map((item: MenuItem, index: number) => {
                    return (
                        <NavItem key={`${item}${index}`}>
                            <NavLink href={item.path}>{item.title}</NavLink>
                        </NavItem>
                    );
                })}
            </ul>
        </StyledSidebar>
    );
};
