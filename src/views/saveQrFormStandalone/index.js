import React, { useState } from 'react';
import { Modal, Form, InputNumber, Select, Slider, Radio, Button, Checkbox, Tag, Alert, Upload } from 'antd';
import {CompactPicker} from 'react-color';
import QRCode from 'qrcode.react';
import styled from "styled-components";
import {grayscaleVal, qrReadabilityLevel, warningTagColor} from "../../utils/color";
import {QuestionCircleTwoTone} from "@ant-design/icons";
import Style from "../../components/style";
import LocaleEntry from "../../components/localeEntry";
import { UploadOutlined } from '@ant-design/icons';
import If from "../../components/conditional";

const Option = Select.Option;

const QRCodeStyled = styled.div`
  display: flex;
  box-shadow: 0 0 20px 0 #00000045;
  margin: 20px auto;
  height: 200px;
  width: 200px;
  justify-content: center;
  align-items: center;
  position: relative;
  
  #qrCode {
    max-width: 200px;
    max-height: 200px;
  }
`;

const QRCodeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const FooterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SaveQrFormStyled = styled.div`

`;

const SaveQRFormStandalone = () => {
  const [qrSettings, setQrSettings] = useState({
    size: 200,
    includeMargin: true,
    bgColor: "#ffffff",
    fgColor: "#000000",
    level: "L",
    addImage: false,
    imageSource: "",
    imageSize: 0.1,
    imageRatio: 1
  });

  const [imgFormat, setImgFormat] = useState('png');

  const qrCodeProps = {
    size: qrSettings.size,
    includeMargin: qrSettings.includeMargin,
    bgColor: qrSettings.bgColor,
    fgColor: qrSettings.fgColor,
    level: qrSettings.level,
    renderAs: imgFormat === "svg" ? "svg" : "canvas"
  };

  if (qrSettings.addImage && qrSettings.imageSource && qrSettings.imageSource.length) {
    qrCodeProps.imageSettings = {
      src: qrSettings.imageSource,
      excavate: true
    }
    qrCodeProps.imageSettings.height = qrSettings.imageSize * qrSettings.size;
    qrCodeProps.imageSettings.width = qrSettings.imageSize * qrSettings.size * qrSettings.imageRatio;
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

  const readabilityLevel = qrReadabilityLevel(qrSettings.fgColor, qrSettings.bgColor);

  const onUpload = (file) => {
    const imgUrl = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = imgUrl;
    img.onload = () => {
      setQrSettings({
        ...qrSettings,
        imageSource: imgUrl,
        addImage: true,
        imageHeight: 0.1,
        imageRatio: img.width / img.height
      });
    }
    return false;
  };

  return (
    <SaveQrFormStyled>
      {(grayscaleVal(qrSettings.fgColor) > grayscaleVal(qrSettings.bgColor)) &&
      <Alert
        style={{marginBottom: 20}}
        message={<LocaleEntry>saveQrCodeModal.readabilityLevel.alert.message</LocaleEntry>}
        type="warning"
        showIcon
      />
      }
      <div>
        <LocaleEntry>saveQrCodeModal.readabilityLevel.label</LocaleEntry>: <Style width={70} textAlign="center">
        <Tag color={warningTagColor(readabilityLevel)}>
          {readabilityLevel.toFixed(2)}%
        </Tag>
      </Style>
        <a href="/aboutReadability" target="_blank"><QuestionCircleTwoTone /></a>
      </div>
      <QRCodeWrapper>
        <QRCodeStyled>
          <QRCode id="qrCode" value={atob(window.location.hash.slice(1))} {...qrCodeProps}/>
        </QRCodeStyled>
      </QRCodeWrapper>
      <Form
        form={form}
        onValuesChange={v => setQrSettings({...qrSettings, ...v})}
        initialValues={qrSettings}
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
      >
        <Form.Item name="size" label={<LocaleEntry>saveQrCodeModal.form.size.label</LocaleEntry>}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="includeMargin" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
          <Checkbox><LocaleEntry>saveQrCodeModal.form.includeMargin.label</LocaleEntry></Checkbox>
        </Form.Item>
        <Form.Item label={<LocaleEntry>saveQrCodeModal.form.fgColor.label</LocaleEntry>}>
          <CompactPicker color={qrSettings.fgColor} onChange={c => setQrSettings({...qrSettings, fgColor: c.hex})}/>
        </Form.Item>
        <Form.Item label={<LocaleEntry>saveQrCodeModal.form.bgColor.label</LocaleEntry>}>
          <CompactPicker color={qrSettings.bgColor} onChange={c => setQrSettings({...qrSettings, bgColor: c.hex})}/>
        </Form.Item>
        <Form.Item name="level" label={<LocaleEntry>saveQrCodeModal.form.level.label</LocaleEntry>}>
          <Select onChange={v => form.setFieldsValue({level: v})}>
            <Option default value="L">L</Option>
            <Option value="M">M</Option>
            <Option value="Q">Q</Option>
            <Option value="H">H</Option>
          </Select>
        </Form.Item>
        <Form.Item name="addImage" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
          <Checkbox><LocaleEntry>saveQrCodeModal.form.addImage.label</LocaleEntry></Checkbox>
        </Form.Item>
        <If condition={qrSettings.addImage}>
          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Upload beforeUpload={onUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}><LocaleEntry>saveQrCodeModal.form.upload.label</LocaleEntry></Button>
            </Upload>
          </Form.Item>
          <Form.Item name="imageSize" label={<LocaleEntry>saveQrCodeModal.form.imageSize.label</LocaleEntry>}>
            <Slider min={0.1} max={0.3} step={0.01} tooltipVisible={false} />
          </Form.Item>
        </If>
      </Form>
      <FooterStyled>
        <Radio.Group value={imgFormat} onChange={e => setImgFormat(e.target.value)}>
          <Radio value="png">PNG</Radio>
          <Radio value="jpg">JPG</Radio>
          <Radio value="svg">SVG</Radio>
        </Radio.Group>
        <Button key="submit" type="primary" onClick={handleSave}>
          <LocaleEntry>saveQrCodeModal.saveBtn.caption</LocaleEntry>
        </Button>
      </FooterStyled>
    </SaveQrFormStyled>
  );
};

export default SaveQRFormStandalone;
