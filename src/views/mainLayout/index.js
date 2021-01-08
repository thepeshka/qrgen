import { Layout, Menu } from 'antd';
import React from "react";
import FormsData from "../../formsData";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Logo from '../../logo.svg';

const { Header, Content, Sider } = Layout;

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
  const history = useHistory();

  const textFormData = FormsData.text;
  const formsData = Object.entries(FormsData).filter(([k]) => k !== "text");
  const currentFormData = history.location.pathname.slice(1);

  return (
    <LayoutFullHeightStyled>
      <Header className="header">
        <div className="logo"><div style={{marginRight: 16}}><img src={Logo} /></div>QRGen</div>
      </Header>
      <ContentScrollableStyled style={{padding: "0 50px"}}>
        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[currentFormData === "" ? "text" : currentFormData]}
              style={{height: '100%'}}
            >
              <Menu.Item key="text" onClick={() => history.push("/")}>{textFormData.name}</Menu.Item>
              {formsData.map(([key, form], i) =>
                <Menu.Item key={key} onClick={() => history.push("/" + key)}>{form.name}</Menu.Item>
              )}
            </Menu>
          </Sider>
          <ContentScrollableStyled style={{padding: '0 24px', minHeight: 280}}>
              {children}
          </ContentScrollableStyled>
        </Layout>
      </ContentScrollableStyled>
    </LayoutFullHeightStyled>);
};

export default MainLayout;
