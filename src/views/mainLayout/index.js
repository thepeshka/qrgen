import { Layout } from 'antd';
import React from "react";
import styled from "styled-components";
import Logo from '../../logo.svg';

const { Header, Content } = Layout;

const LayoutFullHeightStyled = styled(Layout)`
  height: 100vh;
  
  .logo {
    color: whitesmoke;
    display: flex;
    font-size: 20px;
  }
`;

const ContentScrollableStyled = styled(Content)`
  overflow-x: hidden;
  overflow-y: auto;
`;

const MainLayout = ({children}) => {
  return (
    <LayoutFullHeightStyled>
      <Header className="header">
        <a href="/"><div className="logo"><div style={{marginRight: 16}}><img alt="" src={Logo} /></div>QRGen</div></a>
      </Header>
      <ContentScrollableStyled style={{padding: "0 50px"}}>
        {children}
      </ContentScrollableStyled>
    </LayoutFullHeightStyled>);
};

export default MainLayout;
