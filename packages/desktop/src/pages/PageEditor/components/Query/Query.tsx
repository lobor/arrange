import * as React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';

import { TextField } from 'components/TextField';
import { Method, createQueries, queries } from 'interfaces/Queries';
import { getDataSources } from 'interfaces/DataSources';
import { Card } from '../../styles';
import { queryContext } from '../../context/query';

const CardStyled = styled(Card)`
  height: 25%;
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const CardContentQuery = styled.div`
  border-right: 1px solid #dedede;
  width: 200px;
`;

const CardContentSettingsQuery = styled.div`
  flex: 1;
`;

const Query = () => {
  const { open } = React.useContext(queryContext);
  const [method, setMethod] = React.useState<Method>('find');

  const {
    data: dataSources,
    status: statusDataSources,
    error: errorDatasources
  } = getDataSources();
  const { data, status, error } = queries();
  const [createQuery] = createQueries();

  const handleNew = () => {
    createQuery({ name: 'query' });
  };

  const handleChangeType = (e: any) => {
    setMethod(e.currentTarget.dataset.value)
  };

  if (!open) return null;

  return (
    <CardStyled style={{ height: '25%' }}>
      <CardContentQuery>
        <CardHeader
          title="Toto header"
          titleTypographyProps={{ variant: 'body1' }}
          action={
            <Button color="primary" onClick={handleNew} startIcon={<AddOutlinedIcon />}>
              New
            </Button>
          }
        />
        {(status === 'loading' || statusDataSources === 'loading') && <CircularProgress />}
        {status === 'error' && error && error.toString()}
        {statusDataSources === 'error' && errorDatasources && errorDatasources.toString()}
        {data && (
          <List>
            {data.data.map(({ _id, name }) => (
              <ListItem button key={_id}>{name}</ListItem>
            ))}
          </List>
        )}
      </CardContentQuery>
      <CardContentSettingsQuery>
        <CardContent>
          <TextField label="Datasources" select name="datasources">
            {dataSources &&
              dataSources.data.map(({ _id, name }) => (
                <MenuItem key={_id} value={_id}>
                  {name}
                </MenuItem>
              ))}
          </TextField>
          <TextField label="Collections" select name="collections">
            <MenuItem>name</MenuItem>
          </TextField>
          <TextField label="Action type" select name="method" onChange={handleChangeType}>
            <MenuItem value="find">find</MenuItem>
            <MenuItem value="findOne">findOne</MenuItem>
            <MenuItem value="count">count</MenuItem>
            <MenuItem value="distinct">distinct</MenuItem>
            <MenuItem value="aggregate">aggregate</MenuItem>
            <MenuItem value="insertOne">insertOne</MenuItem>
            <MenuItem value="updateOne">updateOne</MenuItem>
            <MenuItem value="deleteOne">deleteOne</MenuItem>
            <MenuItem value="updateMany">updateMany</MenuItem>
          </TextField>
          {method === 'find' && (
            <div>
              <TextField label="Query" name="query" />
              <TextField label="Projection" name="projection" />
              <TextField label="Sort by" name="sortBy" />
              <TextField label="Limit" name="limit" />
              <TextField label="Skip" name="skip" />
            </div>
          )}
          {method === 'findOne' && (
            <div>
              <TextField label="Query" name="query" />
              <TextField label="Projection" name="projection" />
              <TextField label="Skip" name="skip" />
            </div>
          )}
          {method === 'count' && (
            <div>
              <TextField label="Query" name="query" />
            </div>
          )}
          {method === 'distinct' && (
            <div>
              <TextField label="Query" name="query" />
              <TextField label="Field" name="field" />
              <TextField label="Options" name="option" />
            </div>
          )}
          {method === 'aggregate' && (
            <div>
              <TextField label="Aggregation" name="aggregation" />
            </div>
          )}
          {method === 'insertOne' && (
            <div>
              <TextField label="Insert" name="insert" />
            </div>
          )}
          {method === 'updateOne' && (
            <div>
              <TextField label="Query" name="query" />
              <TextField label="Update" name="update" />
              <TextField label="Options" name="option" />
            </div>
          )}
          {method === 'deleteOne' && (
            <div>
              <TextField label="Query" name="query" />
            </div>
          )}
          {method === 'updateMany' && (
            <div>
              <TextField label="Query" name="query" />
              <TextField label="Update" name="update" />
              <TextField label="Options" name="option" />
            </div>
          )}
        </CardContent>
      </CardContentSettingsQuery>
    </CardStyled>
  );
};

export { Query };
