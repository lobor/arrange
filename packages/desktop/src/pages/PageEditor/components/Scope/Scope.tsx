import * as React from 'react';
import JSONTree from 'react-json-tree';
import { ResizableBox } from 'react-resizable';
import { Empty, Card, Collapse } from 'antd';
import styled from 'styled-components'

import { scopeContext } from '../../context/scope';

const Rezise = styled.div`
  background-color: #d9d9d9;
  width: 2px;
  position: absolute;
  cursor: col-resize;
  left: 0;
  top: 0;
  bottom: 0;
`;

const theme = {
  scheme: 'default',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#181818',
  base01: '#282828',
  base02: '#383838',
  base03: '#585858',
  base04: '#b8b8b8',
  base05: '#d8d8d8',
  base06: '#e8e8e8',
  base07: '#f8f8f8',
  base08: '#ab4642',
  base09: '#dc9656',
  base0A: '#f7ca88',
  base0B: '#a1b56c',
  base0C: '#86c1b9',
  base0D: '#7cafc2',
  base0E: '#ba8baf',
  base0F: '#a16946'
};

const Scope = () => {
  const { scopes, open } = React.useContext(scopeContext);

  if (!open) return null;

  const componentsArray = Object.keys(scopes.components!);
  const queriesArray = Object.keys(scopes.queries!);
  return (
    <ResizableBox
      className="resizeBox"
      handle={<Rezise />}
      axis="x"
      resizeHandles={['w']}
      width={300}
      height={200}
      minConstraints={[300, 100]}
      maxConstraints={[500, 300]}
    >
    <Card
      bordered={false}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ flex: 1, overflow: 'auto', padding: 0 }}
    >
      <Collapse defaultActiveKey={['Components', 'Queries']} bordered={false}>
        {scopes.components && <Collapse.Panel header="Components" key="Components">
          {componentsArray.length === 0 && <Empty />}
          {componentsArray.map((name, i) => {
            const scope = scopes.components![name];
            if (!scope) return null;
            return <JSONTree key={`${name}-${i}`} keyPath={[name]} data={scope} theme={theme} />;
          })}
        </Collapse.Panel>}
        {scopes.queries && <Collapse.Panel header="Queries" key="Queries">
          {queriesArray.length === 0 && <Empty />}
          {queriesArray.map((name, i) => {
            const scope = scopes.queries![name];
            if (!scope) return null;
            return <JSONTree key={`${name}-${i}`} keyPath={[name]} data={scope} theme={theme} />;
          })}
        </Collapse.Panel>}
      </Collapse>
    </Card>
    </ResizableBox>
  );
};

export { Scope };
