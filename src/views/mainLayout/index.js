import { Layout } from 'antd';
import React from "react";
import styled from "styled-components";
import Logo from '../../logo.svg';
import LanguageSelector from "../../components/languageSelector";

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

const HeaderStyled = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainLayout = ({children}) => {
  return (
    <LayoutFullHeightStyled>
      <HeaderStyled className="header">
        <a href="/"><div className="logo"><div style={{marginRight: 16}}><img alt="" src={Logo} /></div>QRGen</div></a>
        <LanguageSelector />
      </HeaderStyled>
      <ContentScrollableStyled style={{padding: "0 50px"}}>
        {children}
      </ContentScrollableStyled>
    </LayoutFullHeightStyled>);
};

export default MainLayout;
