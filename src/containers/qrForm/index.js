import {Form, Input, Row, Col, Checkbox, Select, Button} from 'antd';
import React, {useEffect, useRef, useState} from "react";
import QRCode from 'qrcode.react';
import styled from "styled-components";
import SaveQrModal from "../../views/saveQrModal";

const {Option} = Select;

const fieldMap = {
  text: (formData, formState, {id, title, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
    <Input maxLength={100} />
  </Form.Item>),
  textArea: (formData, formState, {id, title, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
      <Input.TextArea maxLength={2000} autoSize={{minRows: 2, maxRows: 10}} />
    </Form.Item>),
  password: (formData, formState, {id, title, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
    <Input.Password maxLength={100} />
  </Form.Item>),
  choices: (formData, formState, {id, title, choices, form, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
    <Select onChange={v => form.setFieldsValue({[id]: v})}>
      {
        choices.map(({value, caption}, k) => <Option value={value} key={k}>{caption}</Option>)
      }
    </Select>
  </Form.Item>),
  boolean: (formData, formState, {id, title, showIf = () => true}) => (
    showIf(formState) && <Form.Item
      name={id}
      valuePropName="checked"
      wrapperCol={{offset: 8, span: 16}}
    >
    <Checkbox>{title}</Checkbox>
  </Form.Item>)
};

const fieldDefaultValueMap = {
  text: () => "",
  textArea: () => "",
  password: () => "",
  choices: f => f.choices[0].value,
  boolean: () => false
}

const QRCodeStyled = styled.div`
  background-color: white;
  height: 200px;
  width: 200px;
  box-sizing: content-box;
  box-shadow: 0 0 20px 0 #00000045;
  margin: 20px 0;
`;

const FormStyled = styled(Form)`
  margin-top: 20px;
`

const QRForm = ({formData}) => {
  const {fields, renderer} = formData;
  const [form] = Form.useForm();
  const [state, setState] = useState(Object.fromEntries(fields.map(f => [f.id, fieldDefaultValueMap[f.type](f)])));
  const [showSaveQrModal, setShowQrModal] = useState(false);

  return (<Row justify="center">
      <Col span={12}>
        <Row gutter={16}>
          <Col flex="auto">
            <FormStyled
              form={form}
              onValuesChange={v => setState({...state, ...v})}
              initialValues={state}
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
            >
              {
                fields.map((f, k) => <React.Fragment key={k}>{fieldMap[f.type](formData, state, {...f, form})}</React.Fragment>)
              }
            </FormStyled>
          </Col>
          <Col span={3} />
          <Col flex="200px">
            <QRCodeStyled>
              <QRCode id="qr" includeMargin={true} value={renderer(state).slice(0, 23648)} size={200} />
            </QRCodeStyled>
            <Button type="primary" block onClick={() => setShowQrModal(true)}>Save</Button>
            {showSaveQrModal && <SaveQrModal
              qrData={renderer(state).slice(0, 23648)}
              onClose={() => setShowQrModal(false)}
            />}
          </Col>
        </Row>
      </Col>
    </Row>);
};

export default QRForm;
