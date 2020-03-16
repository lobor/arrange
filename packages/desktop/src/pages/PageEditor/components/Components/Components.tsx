import * as React from 'react';

import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Card } from '../../styles'
import { componentContext} from '../../context'

const Components = () => {
  const { open } = React.useContext(componentContext)

  const [tabIndex, setTabIndex] = React.useState<number>(0)

  const toggleTab = React.useCallback(
    (event: React.ChangeEvent<{}>, newValue: number) => {
      setTabIndex(newValue);
    },
    [setTabIndex]
  );

  if (!open) return null;

  return (
    <Card style={{ width: '15%' }}>
      <Tabs textColor="primary" indicatorColor="primary" value={tabIndex} onChange={toggleTab}>
        <Tab label="Components" />
      </Tabs>
      {tabIndex === 0 && <Box p={3}>Item One</Box>}
    </Card>
  );
};

export { Components };
