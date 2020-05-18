import * as React from 'react';
import { Form, Mentions as MAntds } from 'antd';
import { FormItemProps } from 'antd/lib/form/index.d';
import flat from 'flat';

import { scopeContext } from '../../pages/PageEditor/context/scope';

export interface MentionsProps {
  formItemProps?: Omit<FormItemProps, 'children'>;
}

const Mentions: React.FC<MentionsProps> = ({ formItemProps }) => {
  const { scopes } = React.useContext(scopeContext);
  const mergeScope = React.useMemo(
    () => ({ ...(scopes.components || {}), ...(scopes.queries || {}) }),
    [scopes]
  );
  const optionsParsed = React.useMemo(() => {
    return Object.keys({ ...flat(mergeScope, { safe: true }), ...mergeScope }).map(key => ({
      label: `{{${key}}}`,
      value: `{{${key}}}`
    }));
  }, [mergeScope]);
  return (
    <Form.Item {...formItemProps}>
      <MAntds rows={3} split="" prefix="{{" style={{ width: '100%' }}>
        {optionsParsed.map(({ label, value }) => (
          <MAntds.Option key={value} value={value.replace('{{', '')}>
            {label}
          </MAntds.Option>
        ))}
      </MAntds>
    </Form.Item>
  );
};

export { Mentions };
