import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import LocaleEntry from "../../components/localeEntry";

import {
  isBrowser
} from "react-device-detect";

const { Title } = Typography;

const AboutReadabilityPage = () => {
  return (<Typography style={{marginTop: 40}}>
    <Title><LocaleEntry>aboutReadabilityPage.title</LocaleEntry></Title>
    <Row gutter={[16, 16]}>
      <Col span={isBrowser ? 12 : 24}>
        <Card title={<LocaleEntry>aboutReadability.contrast.title</LocaleEntry>} style={{height: "100%"}}>
          <LocaleEntry>aboutReadability.contrast.content</LocaleEntry>
        </Card>
      </Col>
      <Col span={isBrowser ? 12 : 24}>
        <Card title={<LocaleEntry>aboutReadability.errorCorrection.title</LocaleEntry>} style={{height: "100%"}}>
          <LocaleEntry>aboutReadability.errorCorrection.content</LocaleEntry>}
        </Card>
      </Col>
      <Col span={isBrowser ? 12 : 24}>
        <Card title={<LocaleEntry>aboutReadability.negative.title</LocaleEntry>} style={{height: "100%"}}>
          <LocaleEntry>aboutReadability.negative.content</LocaleEntry>
        </Card>
      </Col>
    </Row>
  </Typography>);
};

export default AboutReadabilityPage;
