import * as React from 'react';
import List from '@material-ui/core/List';
import JSONTree from 'react-json-tree';
import { useParams } from 'react-router-dom';

import { CollapseMenu } from 'components/CollapseMenu';
import { Card } from '../../styles';
import { scopeContext } from '../../context/scope';

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

  return (
    <Card>
      <List component="nav">
        <CollapseMenu label="Components">
          {Object.keys(scopes).map((name, i) => {
            const scope = scopes[name];
            if (!scope) return null;
            return (
              <JSONTree
                key={`${name}-${i}`}
                keyPath={[name]}
                data={scope}
                theme={theme}
              />
            );
          })}
        </CollapseMenu>
        {/* <CollapseMenu label="Queries">
          <JSONTree data={json} theme={theme} />
        </CollapseMenu>
        <CollapseMenu label="Global">
          <JSONTree data={json} theme={theme} />
          <JSONTree data={json} theme={theme} />
          <JSONTree data={json} theme={theme} />
        </CollapseMenu> */}
      </List>
    </Card>
  );
};

export { Scope };
