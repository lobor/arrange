import * as React from 'react';
import { Card } from 'antd';
import { ResizableBox } from 'react-resizable';
import styled from 'styled-components';

import { componentContext } from '../../context/component';
import { ListComponent } from './components/ListComponent';
import { EditComponent } from './components/EditComponent';

const Rezise = styled.div`
  background-color: #d9d9d9;
  width: 2px;
  position: absolute;
  cursor: col-resize;
  right: 0;
  top: 0;
  bottom: 0;
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
      axis="x"
      width={300}
      height={200}
      minConstraints={[300, 100]}
      maxConstraints={[500, 300]}
    >
      <Card
        bordered={false}
        tabList={tabListNoTitle}
        activeTabKey={tabIndex}
        onTabChange={toggleTab}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        bodyStyle={{ flex: 1, overflow: 'auto' }}
      >
        {contentList[tabIndex]}
      </Card>
    </ResizableBox>
  );
};

export { Components };
