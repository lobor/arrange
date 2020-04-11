import * as React from 'react';

import { AutoCompleteScope } from 'components/AutoCompleteScope';

const FormText = () => {
  return <AutoCompleteScope formItemProps={{ label: 'Default value', name: 'defaultValue' }} />;
};

export { FormText };
