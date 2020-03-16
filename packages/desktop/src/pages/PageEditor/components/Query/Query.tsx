import * as React from 'react';

import { Card } from '../../styles';
import { queryContext } from '../../context';

const Query = () => {
  const { open } = React.useContext(queryContext);
  if (!open) return null;
  return <Card style={{ height: '25%' }}>query</Card>;
};

export { Query };
