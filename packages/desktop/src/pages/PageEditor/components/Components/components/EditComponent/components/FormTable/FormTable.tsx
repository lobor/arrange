import * as React from 'react';

import { AutoCompleteScope } from 'components/AutoCompleteScope';

const FormTable = () => {
  return (
    <>
      <AutoCompleteScope formItemProps={{ label: 'Data', name: 'data' }} />
    </>
  );
};

export { FormTable };
