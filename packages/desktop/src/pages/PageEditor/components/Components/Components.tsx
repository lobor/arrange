import * as React from 'react';
import { Card } from 'antd';

import { componentContext } from '../../context/component';
import { ListComponent } from './components/ListComponent';
import { EditComponent } from './components/EditComponent';

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
    <Card tabList={tabListNoTitle} activeTabKey={tabIndex} onTabChange={toggleTab}>
      {contentList[tabIndex]}
    </Card>
  );
};

export { Components };
