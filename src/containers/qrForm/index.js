import {Form, Input, Row, Col, Checkbox, Select, Button} from 'antd';
import React, {useState} from "react";
import QRCode from 'qrcode.react';
import styled from "styled-components";
import SaveQrModal from "../../views/saveQrModal";
import {
  isBrowser,
  isMobile
} from "react-device-detect";

const {Option} = Select;

const filtersMap = {
  email: email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  phone: e => {
    if (e.charCode) {
      const char = String.fromCharCode(e.charCode)
      if (e.target.value.length) {
        return /\d/.test(char);
      }
      return char === '+' || /\d/.test(char);
    }
    return /\+?\d*/.test(e.target.value);
  }
};

const getFilter = (filterName) => {
  if (filterName)
    return filtersMap[filterName];
  return () => true;
}

const fieldMap = {
  text: (formData, formState, {id, title, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
    <Input style={{width: "100%"}} maxLength={100} />
  </Form.Item>),
  textArea: (formData, formState, {id, title, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
      <Input.TextArea style={{width: "100%"}} maxLength={2000} autoSize={{minRows: 2, maxRows: 10}} />
    </Form.Item>),
  password: (formData, formState, {id, title, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
    <Input.Password style={{width: "100%"}} maxLength={100} />
  </Form.Item>),
  choices: (formData, formState, {id, title, choices, form, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
    <Select
      style={{width: "100%"}}
      onChange={v => form.setFieldsValue({[id]: v})}
    >
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
  </Form.Item>),
  array: (formData, formState, {id, title, form, filterType, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
      <Select
        style={{width: "100%"}}
        mode="tags"
        tokenSeparators={[',']}
        onChange={v => form.setFieldsValue({[id]: v.filter(getFilter(filterType))})}
        open={false}
      />
    </Form.Item>),
  phone: (formData, formState, {id, title, showIf = () => true}) => (
    showIf(formState) && <Form.Item name={id} label={title}>
      <Input
        maxLength={100}
        style={{width: "100%"}}
        onKeyPress={e => !filtersMap.phone(e) && e.preventDefault()}
        onPaste={e => !filtersMap.phone(e) && e.preventDefault()}
      />
    </Form.Item>),
};

const fieldDefaultValueMap = {
  text: () => "",
  textArea: () => "",
  password: () => "",
  choices: f => f.choices[0].value,
  boolean: () => false,
  array: () => [],
  phone: () => ""
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
      <Col span={isMobile ? 24 : 12}>
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
          {isBrowser && <Col span={3} />}
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
