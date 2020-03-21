import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';

// import { PreviewDrag } from './components/PreviewDrag';
import { Card } from '../../styles';
import { componentContext } from '../../../../context/component';
import { ListComponent } from './components/ListComponent';
import { EditComponent } from './components/EditComponent';

const ContainerTabContent = styled.div`
  flex: 1;
  overflow: auto;
`;

const Components = () => {
  const { item, open } = React.useContext(componentContext);

  const [tabIndex, setTabIndex] = React.useState<number>(1);

  const toggleTab = React.useCallback(
    (event: React.ChangeEvent<{}>, newValue: number) => {
      setTabIndex(newValue);
    },
    [setTabIndex]
  );

  React.useEffect(() => {
    setTabIndex(item ? 0 : 1);
  }, [item]);

  if (!open) return null;

  return (
    <Card>
      <Tabs textColor="primary" indicatorColor="primary" value={tabIndex} onChange={toggleTab}>
        <Tab label="Inspector" />
        <Tab label="Components" />
      </Tabs>
      <ContainerTabContent>
        {tabIndex === 0 && <EditComponent />}
        {tabIndex === 1 && <ListComponent />}
      </ContainerTabContent>
    </Card>
  );
};

export { Components };
