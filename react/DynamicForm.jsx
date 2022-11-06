import { MinusCircleOutlined, PlusOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React, {useState} from "react";
import { Button, Form, InputNumber, Select, Space, Row, Col, Typography } from 'antd';
const tokenList = ["ETH", "WETH", "DAI", "USDC", "USDT"]
const token = tokenList.map((token) => {
  return { label: token, value: token };
});

const { Paragraph, Title } = Typography;

export default function DynamicForm({
}) {
  const qs = require('qs');

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const handleChange = () => {
    // form.setFieldsValue({
    //     "quantity": []
    //     });
  };

  const [valueToken1, setValueToken1] = useState(
    "0"
  );

  const [valueToken2, setValueToken2] = useState(
    "0"
  );

  const [price, setPrice] = useState(
    "1627.34"
  );  

  const onChangeToken1 = (editVal) => {
    setValueToken1(editVal);
  };

  const onChangeToken2 = (editVal) => {
    setValueToken2(editVal);
  };

  const onChangePrice = (input) => {

    setValueToken2(input);
  };

  return (
    <Space
      // style={{ display: "flex" }}
      align="baseline"
    >
      <Form name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Title level={3}>Select Pair</Title>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Token 1"
              name="Token1"
              rules={[
                {
                  required: true,
                  message: 'Please select the first token!',
                },
              ]}>
              <Select options={token} style={{ width: 110 }} defaultValue={"ETH"} allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Token 2"
              name="Token2"
              rules={[
                {
                  required: true,
                  message: 'Please select the second token!',
                },
              ]}>
              <Select options={token} style={{ width: 110 }} defaultValue={"USDC"} allowClear={true} />
            </Form.Item>
          </Col>
        </Row>
        <Paragraph>Current price (token2 v.s. token1) based on 0x swap api is {price}.</Paragraph>
        <Title level={3}>Select Price Range(token2 v.s. token1)</Title>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Min Price"
              name="MinPrice"
              rules={[
                {
                  required: true,
                  message: 'Token 2 per Token 1!',
                },
              ]}>
              <InputNumber defaultValue={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Max Price"
              name="MaxPrice"
              rules={[
                {
                  required: true,
                  message: 'Token 2 per Token 1!',
                },
              ]}>
              <InputNumber defaultValue={0} />
            </Form.Item>
          </Col>
        </Row>
        <Title level={3}>Desired Deposit Amount</Title>        
        <Row>
          <Col span={12}>
            <Form.Item
              label="Token 1 "
              name="DesiredDepositAmountToken1"
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}>
              <InputNumber defaultValue={0} onChange={onChangeToken1} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Token 2"
              name="DesiredDepositAmountToken2"
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}>
              <InputNumber defaultValue={0} onChange={onChangeToken2} />
            </Form.Item>
          </Col>
        </Row>
        <Title level={4}>Token amounts after optimal swapped and before mint. Token 1: {valueToken1}, Token 2: {valueToken2} </Title>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
          Swap and Despoit
          </Button>
        </Form.Item>
      </Form>
      
    </Space>
  );
};