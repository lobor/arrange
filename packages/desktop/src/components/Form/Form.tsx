import * as React from 'react';
import { Form as FormAntd, Button, InputNumber, Input, Row, Col, Divider } from 'antd';
import { FormProps as FormPropsAntd } from 'rc-field-form/lib/Form';
import styled from 'styled-components';
import Handlebars from 'handlebars';

import { Component, ItemType } from 'interfaces/Components';

import { scopeContext } from '../../pages/PageEditor/context/scope';

const FormAntdStyled = styled(FormAntd)`
  width: 100%;
  display: inline-block;
  height: 100%;
  .ant-input-number {
    width: 100%;
  }
`;

interface FormProps {
  component: Component;
  onSubmit: FormPropsAntd['onFinish'];
}

const Form: React.FC<FormProps> = ({ component, onSubmit }) => {
  const { updateScope, scopes, queries } = React.useContext(scopeContext);
  const [form] = FormAntdStyled.useForm();
  const handleChange = () => {
    updateScope(component.name, { ...component, values: form.getFieldsValue() }, 'components');
  };

  const initialValues = React.useMemo(() => {
    const initialValues: { [key: string]: any } = {};
    for (const item of component.items || []) {
      let value;
      try {
        const templateValue = Handlebars.compile(item.defaultValue || '');
        value = templateValue({ ...scopes.components, ...queries });
      } catch (e) {
        console.log(e.toString());
      }
      initialValues[item.name] = value;
    }
    return initialValues;
  }, [scopes.components, component.items, queries]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    form.setFieldsValue(initialValues);
    handleChange();
  }, [JSON.stringify(initialValues), form]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormAntdStyled form={form} onChange={handleChange} onFinish={onSubmit}>
      {(component.items || []).map((formElement, i) => {
        let content = null;
        switch (formElement.type) {
          case ItemType.text:
            content = (
              <Input
                name={formElement.name}
                type={formElement.type}
                placeholder={formElement.placeholder}
              />
            );
            break;
          case ItemType.number:
            content = (
              <InputNumber
                name={formElement.name}
                type={formElement.type}
                placeholder={formElement.placeholder}
              />
            );
            break;
        }
        return (
          <FormAntdStyled.Item
            key={`${formElement.name}-${i}`}
            label={formElement.label}
            name={formElement.name}
            rules={[{ required: formElement.required }]}
          >
            {content}
          </FormAntdStyled.Item>
        );
      })}
      <Divider />
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </FormAntdStyled>
  );
};

export { Form };
