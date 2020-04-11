import * as React from 'react';
import { Form, AutoComplete } from 'antd';

import { scopeContext } from '../../../../../../context/scope';

const FormTable = () => {
  const [options, setOptions] = React.useState<{ value: string }[]>([]);
  const { scopes } = React.useContext(scopeContext);
  const optionsParsed = React.useMemo(
    () => Object.keys(scopes.components || {}).map(key => ({ value: `{{${key}}}` })),
    [scopes]
  );
  const filterOption = React.useCallback((inputValue, option) => {
    const regExp = new RegExp(inputValue, 'i')
    return Boolean(option.value.match(regExp));
  }, []);
  React.useEffect(() => {
    setOptions(optionsParsed);
  }, [optionsParsed]);
  return (
    <>
      <Form.Item label="Data" name="data">
        <AutoComplete options={options} filterOption={filterOption} />
      </Form.Item>
    </>
  );
};

export { FormTable };
