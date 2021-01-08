import React, { useState } from 'react';
import { Modal, Form, InputNumber, Select, Row, Col, Input, Slider, Radio, Button, Checkbox } from 'antd';
import {CompactPicker} from 'react-color';
import QRCode from 'qrcode.react';
import styled from "styled-components";

const Option = Select.Option;

const QRCodeStyled = styled.div`
  display: flex;
  box-shadow: 0 0 20px 0 #00000045;
  margin: 0 auto 20px auto;
  height: 200px;
  width: 200px;
  justify-content: center;
  align-items: center;
`;

const QRCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SaveQrModal = ({qrData, onClose}) => {
  const [qrSettings, setQrSettings] = useState({
    size: 200,
    includeMargin: true,
    bgColor: "#ffffff",
    fgColor: "#000000",
    level: "L",
    addImage: false,
    imageSource: "",
    imageWidth: 10,
    imageHeight: 10,
    imageCenter: false,
    imageX: 0,
    imageY: 0,
    imageExcavate: true
  });

  const [imgFormat, setImgFormat] = useState('png');

  const qrCodeProps = {
    size: qrSettings.size <= 200 ? qrSettings.size : 200,
    includeMargin: qrSettings.includeMargin,
    bgColor: qrSettings.bgColor,
    fgColor: qrSettings.fgColor,
    level: qrSettings.level,
    renderAs: imgFormat === "svg" ? "svg" : "canvas"
  };

  if (qrSettings.addImage) {
    qrCodeProps.imageSettings = {
      src: qrSettings.imageSource,
      excavate: qrSettings.imageExcavate,
      width: qrSettings.imageWidth,
      height: qrSettings.imageHeight
    }
    if (qrSettings.imageCenter) {
      qrCodeProps.imageSettings = {
        ...qrCodeProps.imageSettings,
        x: qrSettings.imageX,
        y: qrSettings.imageY
      }
    }
  }

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }

  const saveImg = () => {
    const mimetype = {png: "image/png", jpg: "image/jpeg"}[imgFormat];
    const canvas = document.getElementById('qrCode');
    canvas.toBlob(function(blob) {
      downloadBlob(blob, `qrgen_${Date.now()}.${imgFormat}`);
    }, mimetype, 1);
    onClose();
  }

  const saveSvg = () => {
    const svgEl = document.getElementById('qrCode');
    const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\"" + svgEl.outerHTML.slice(4)
    const blob = new Blob([svg], {type: 'image/svg+xml'});
    downloadBlob(blob, `qrgen_${Date.now()}.${imgFormat}`);
  }

  const handleSave = () => {
    if (imgFormat === 'svg') saveSvg(); else saveImg();
  };

  const [form] = Form.useForm();

  return (
    <Modal
      title="Save QR code"
      visible={true}
      onOk={handleSave}
      onCancel={onClose}
      okText="Save"
      footer={[
        <Radio.Group value={imgFormat} onChange={e => setImgFormat(e.target.value)}>
          <Radio value="png">PNG</Radio>
          <Radio value="jpg">JPG</Radio>
          <Radio value="svg">SVG</Radio>
        </Radio.Group>,
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <QRCodeWrapper>
        <QRCodeStyled>
          <QRCode id="qrCode" value={qrData} {...qrCodeProps}/>
        </QRCodeStyled>
      </QRCodeWrapper>
      <Form
        form={form}
        onValuesChange={v => setQrSettings({...qrSettings, ...v})}
        initialValues={qrSettings}
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
      >
        <Form.Item name="size" label="Size">
          <InputNumber />
        </Form.Item>
        <Form.Item name="includeMargin" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
          <Checkbox>Margin</Checkbox>
        </Form.Item>
        <Form.Item label="Foreground Color">
          <CompactPicker color={qrSettings.fgColor} onChange={c => setQrSettings({...qrSettings, fgColor: c.hex})}/>
        </Form.Item>
        <Form.Item label="Background Color">
          <CompactPicker color={qrSettings.bgColor} onChange={c => setQrSettings({...qrSettings, bgColor: c.hex})}/>
        </Form.Item>
        <Form.Item name="level" label="Error correction level">
          <Select onChange={v => form.setFieldsValue({level: v})}>
            <Option default value="L">L</Option>
            <Option value="M">M</Option>
            <Option value="Q">Q</Option>
            <Option value="H">H</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaveQrModal;
