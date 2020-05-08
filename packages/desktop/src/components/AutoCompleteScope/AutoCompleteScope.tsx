import * as React from 'react';
import { Form, AutoComplete, Mentions } from 'antd';
import { AutoCompleteProps } from 'antd/lib/auto-complete/index.d';
import { FormItemProps } from 'antd/lib/form/index.d';
import fuzzy from 'fuzzy';
import flat from 'flat';

import { scopeContext } from '../../pages/PageEditor/context/scope';

export interface AutoCompleteScopeProps {
  formItemProps?: Omit<FormItemProps, 'children'>;
  autoCompleteProps?: AutoCompleteProps;
}

const AutoCompleteScope: React.FC<AutoCompleteScopeProps> = ({
  autoCompleteProps,
  formItemProps
}) => {
  const { scopes } = React.useContext(scopeContext);
  const mergeScope = React.useMemo(
    () => ({ ...(scopes.components || {}), ...(scopes.queries || {}) }),
    [scopes]
  );
  const optionsParsed = React.useMemo(
    () =>
      Object.keys(flat(mergeScope, { safe: true })).map(key => ({
        value: `${key}}}`
      })),
    [mergeScope]
  );
  const [options, setOptions] = React.useState<{ value: string }[]>(optionsParsed);
  const filterOption = React.useCallback(
    inputValue => {
      var results = fuzzy.filter(inputValue.replace(/(\{|\})/g, ''), Object.keys(mergeScope));
      var matches = results.reduce<{ value: string }[]>(function(acc, el) {
        const element = Object.keys(mergeScope).find(key => key === el.string);
        if (element) {
          acc.push({ value: `${el.string}}}` });
        }
        return acc;
      }, []);
      setOptions(matches);
    },
    [mergeScope]
  );
  return (
    <>
      <Form.Item {...formItemProps}>
        <Mentions
          style={{ width: '100%' }}
          prefix="{{"
        >
          {options.map(({ value }) => (
            <Mentions.Option key={value} value={value}>
              {`{{${value}`}
            </Mentions.Option>
          ))}
        </Mentions>
      </Form.Item>
    </>
  );
};

export { AutoCompleteScope };
