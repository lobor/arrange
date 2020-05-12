import * as React from 'react';
import Handlebars from 'handlebars';
import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
// @ts-ignore
import { calcGridItemPosition } from 'react-grid-layout/build/calculateUtils';

import { Form } from 'components/Form';
import { Table } from 'components/Table';
import { Component } from 'interfaces/Components';
import { TextField } from 'components/TextField';
import { scopeContext } from '../../../../context/scope';
import { COMPONENT, gridLayout } from '../../../../constants';

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

interface IsolateComponentProps {
  component: Component;
}

class IsolateComponent extends React.PureComponent<IsolateComponentProps> {
  static contextType = scopeContext;

  handleSelectedRow = (selectedRow: any) => {
    const { updateScope } = this.context;
    const { component } = this.props;
    updateScope(component.name, { ...component, selectedRow }, 'components');
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { updateScope } = this.context;
    const { component } = this.props;
    updateScope(component.name, { ...component, value: e.currentTarget.value }, 'components');
  };

  onSubmit = () => {
    const { component } = this.props;
    const { callFetch, scopes } = this.context;
    const nameQuery = (component.onSubmit || '').replace(/(\{\{|\}\})/g, '');
    if (scopes.queries[nameQuery]) {
      callFetch(scopes.queries[nameQuery]._id, scopes.components);
    }
  };

  render() {
    const { component } = this.props;
    const { position, type } = component;
    const { scopes, queries } = this.context;

    if (!position) return null;

    const { height, width } = calcGridItemPosition(
      gridLayout,
      position.x,
      position.y,
      position.w,
      position.h
    );
    let value;
    try {
      const templateValue = Handlebars.compile(component.defaultValue || '');
      value = templateValue(scopes.components);
    } catch (e) {
      console.log(e.toString());
    }

    let Comp: React.ReactNode | null = <></>;
    switch (type) {
      case COMPONENT.text.type:
        const CompTmp =
          !component.format || component.format === 'body' ? Typography : Typography.Title;
        Comp = (
          <CompTmp
            style={{
              fontWeight: component.strong ? 'bold' : 'initial',
              margin: 0,
              textDecoration: component.underline ? 'underline' : 'initial',
              zIndex: 1
            }}
            level={
              !component.format || component.format === 'body'
                ? undefined
                : (Number(component.format) as TitleProps['level'])
            }
          >
            {value || 'Loading...'}
          </CompTmp>
        );
        break;
      case COMPONENT.textField.type:
        Comp = <TextField component={component} value={value} onChange={this.onChange} />;
        break;
      case COMPONENT.table.type:
        const keyScope = ((component.data || '') as string).replace(/[{}]/g, '');
        Comp = (
          <Table
            component={component}
            width={width}
            height={height}
            onSelectedRow={this.handleSelectedRow}
            data={queries && queries[keyScope] ? queries[keyScope] : []}
          />
        );
        break;
      case COMPONENT.form.type:
        Comp = <Form component={component} onSubmit={this.onSubmit} />;
        break;
    }
    return Comp;
  }
}

export { IsolateComponent };
