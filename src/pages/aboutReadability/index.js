import React from 'react';
import { Typography, Row, Col, Card } from 'antd';

import {
  isBrowser
} from "react-device-detect";

const { Title } = Typography;

const AboutReadabilityPage = () => {
  return (<Typography style={{marginTop: 40}}>
    <Title>QR codes readability</Title>
    <Row gutter={[16, 16]}>
      <Col span={isBrowser ? 12 : 24}>
        <Card title="Contrast" style={{height: "100%"}}>
          Many QR code scanners operate in grayscale, so the two colors can be seen in sufficient contrast for the human eye, but not for a scanner.
          Try choosing two different colors based on the provided "readability level" based on grayscale brightness of colors.
        </Card>
      </Col>
      <Col span={isBrowser ? 12 : 24}>
        <Card title="Error correction" style={{height: "100%"}}>
          The QR code may be partially blocked or decoded incorrectly, so error correction may come in handy.
          Error correction adds extra bits to the image to help recover the data.
          Error correction options: L, M, Q, H, respectively, from a lower level to a higher.
          You can choose a higher correction level if you have a lot of data or the readability level is low.
          If the readability level is less than 50%, a higher correction level is strongly recommended.
        </Card>
      </Col>
      <Col span={isBrowser ? 12 : 24}>
        <Card title="Negative" style={{height: "100%"}}>
          According to ISO standard, scanners should be able to decode QR codes with darker background color than foreground color but unfortunately many of them is unable.
        </Card>
      </Col>
    </Row>
  </Typography>);
};

export default AboutReadabilityPage;
