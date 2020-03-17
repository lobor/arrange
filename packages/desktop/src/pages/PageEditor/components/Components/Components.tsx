import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { PreviewDrag } from './components/PreviewDrag';
import { Card } from '../../styles';
import { componentContext } from '../../../../context/component';
import { ListComponent } from './components/ListComponent';
import { EditComponent } from './components/EditComponent';

const Components = () => {
  const { open } = React.useContext(componentContext);

  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const toggleTab = React.useCallback(
    (event: React.ChangeEvent<{}>, newValue: number) => {
      setTabIndex(newValue);
    },
    [setTabIndex]
  );

  if (!open) return null;

  return (
    <Card style={{ width: '15%' }}>
      <PreviewDrag />
      <Tabs textColor="primary" indicatorColor="primary" value={tabIndex} onChange={toggleTab}>
        <Tab label="Components" />
        <Tab label="Inspector" />
      </Tabs>
      {tabIndex === 0 && <ListComponent />}
      {tabIndex === 1 && <EditComponent />}
    </Card>
  );
};

export { Components };
