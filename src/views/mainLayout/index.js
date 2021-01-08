import { Layout, Menu, Radio } from 'antd';
import React from "react";
import FormsData from "../../formsData";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Logo from '../../logo.svg';
import {
  BrowserView,
  MobileView
} from "react-device-detect";

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
  let currentFormData = history.location.pathname.slice(1);
  currentFormData = currentFormData === "" ? "text" : currentFormData;
  const redirect = (key) => {
    if (key === "text") history.push("/"); else history.push("/" + key)
  };

  return (
    <LayoutFullHeightStyled>
      <Header className="header">
        <div className="logo"><div style={{marginRight: 16}}><img alt="" src={Logo} /></div>QRGen</div>
      </Header>
      <ContentScrollableStyled style={{padding: "0 50px"}}>
        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
          <BrowserView>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[currentFormData]}
                style={{height: '100%'}}
              >
                <Menu.Item key="text" onClick={() => redirect("text")}>{textFormData.name}</Menu.Item>
                {formsData.map(([key, form]) =>
                  <Menu.Item key={key} onClick={() => redirect(key)}>{form.name}</Menu.Item>
                )}
              </Menu>
            </Sider>
          </BrowserView>
          <ContentScrollableStyled style={{padding: '0 24px', minHeight: 280}}>
            <MobileView>
              <Radio.Group defaultValue={currentFormData}>
                <Radio.Button
                  value="text"
                  onClick={() => redirect("text")}
                >{textFormData.name}</Radio.Button>
                {formsData.map(([key, form]) =>
                  <Radio.Button
                    value={key}
                    onClick={() => redirect(key)}
                  >{form.name}</Radio.Button>
                )}
              </Radio.Group>
            </MobileView>
            {children}
          </ContentScrollableStyled>
        </Layout>
      </ContentScrollableStyled>
    </LayoutFullHeightStyled>);
};

export default MainLayout;
