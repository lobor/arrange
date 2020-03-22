import * as React from 'react';
import List from '@material-ui/core/List';
import JSONTree from 'react-json-tree';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import { CollapseMenu } from 'components/CollapseMenu';
import { getPages } from '../../../../interfaces/Pages';
import { componentToScope } from '../../../../interfaces/Scopes';
import { Card } from '../../styles';
import { scopeContext } from '../../../../context/scope';

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
  const { id } = useParams();
  const { open } = React.useContext(scopeContext);
  const { status, data, error } = getPages(id!);

  if (!data || status === 'loading') {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.toString()}</Alert>;
  }

  if (!open) return null;

  return (
    <Card>
      <List component="nav">
        <CollapseMenu label="Components">
          {data.data.components.map(({ _id, name, ...other }) => (
            <JSONTree
              key={_id}
              keyPath={[name]}
              data={componentToScope({ _id, name, ...other })}
              theme={theme}
            />
          ))}
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
