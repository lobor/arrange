import * as React from 'react';
import { Card } from 'antd';
import { ResizableBox } from 'react-resizable';
import styled from 'styled-components';

import { componentContext } from '../../context/component';
import { ListComponent } from './components/ListComponent';
import { EditComponent } from './components/EditComponent';

const Rezise = styled.div`
  background-color: black;
`;
const contentList = {
  edit: <EditComponent />,
  components: <ListComponent />
};

const tabListNoTitle = [
  {
    key: 'edit',
    tab: 'Inspector'
  },
  {
    key: 'components',
    tab: 'Components'
  }
];

const Components = () => {
  const { item, open } = React.useContext(componentContext);

  const [tabIndex, setTabIndex] = React.useState<'edit' | 'components'>('components');

  const toggleTab = React.useCallback(
    (activeKey: string) => {
      setTabIndex(activeKey as 'edit' | 'components');
    },
    [setTabIndex]
  );

  React.useEffect(() => {
    setTabIndex(item ? 'edit' : 'components');
  }, [item]);

  if (!open) return null;

  return (
    <ResizableBox
      className="resizeBox"
      handle={<Rezise />}
      width={200}
      height={200}
      minConstraints={[100, 100]}
      maxConstraints={[300, 300]}
    >
      <Card
        bordered={false}
        tabList={tabListNoTitle}
        activeTabKey={tabIndex}
        onTabChange={toggleTab}
        style={{ display: 'flex', flexDirection: 'column' }}
        bodyStyle={{ flex: 1, overflow: 'auto' }}
      >
        {contentList[tabIndex]}
      </Card>
    </ResizableBox>
  );
};

export { Components };
