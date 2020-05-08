import * as React from 'react';
import Handlebars from 'handlebars';
import { Typography } from 'antd';
// @ts-ignore
import { calcGridItemPosition } from 'react-grid-layout/build/calculateUtils';

import { Form } from 'components/Form';
import { Table } from 'components/Table';
import { Component as Item } from 'interfaces/Components';
import { TextField } from 'components/TextField';
import { scopeContext } from '../../../../context/scope';
import { COMPONENT, gridLayout } from '../../../../constants';

interface IsolateComponentProps {
  component: Item;
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
        Comp = <Typography>{value || 'Loading...'}</Typography>;
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
        Comp = <Form component={component} />;
        break;
    }
    return Comp;
  }
}

export { IsolateComponent };
