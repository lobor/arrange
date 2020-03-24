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
import Alert from '@material-ui/lab/Alert';

import { TextField } from 'components/TextField';
import { Method, Queries, createQueries, queries } from 'interfaces/Queries';
import { getDataSources } from 'interfaces/DataSources';
import { Card } from '../../styles';
import { queryContext } from '../../context/query';

const CardStyled = styled(Card)`
  height: 40%;
  min-height: 200px;
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

const CardHeaderStyled = styled(CardHeader)`
  border-bottom: 1px solid #dedede;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const CardContentStyled = styled(CardContent)`
  overflow: auto;
  max-height: 100%;
`;

const Query = () => {
  const { open } = React.useContext(queryContext);
  const [method, setMethod] = React.useState<Method>('find');
  const [querySelected, setQuerySelected] = React.useState<Queries>();

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
    setMethod(e.currentTarget.dataset.value);
  };

  const handleSelectQuery = (query: Queries) => () => setQuerySelected(query);

  React.useEffect(() => {
    if (!querySelected && data && data.data[0]) {
      setQuerySelected(data.data[0]);
    }
  }, [querySelected, data]);

  if (!open) return null;

  return (
    <CardStyled>
      <CardContentQuery>
        <CardHeaderStyled
          title="Query"
          titleTypographyProps={{ variant: 'body1' }}
          action={
            <Button
              color="primary"
              size="small"
              onClick={handleNew}
              startIcon={<AddOutlinedIcon />}
            >
              New
            </Button>
          }
        />
        {(status === 'loading' || statusDataSources === 'loading') && <CircularProgress />}
        {status === 'error' && error && error.toString()}
        {statusDataSources === 'error' && errorDatasources && errorDatasources.toString()}
        {data && (
          <List>
            {data.data.map(query => {
              const { _id, name } = query;
              return (
                <ListItem
                  onClick={handleSelectQuery(query)}
                  button
                  key={_id}
                  selected={querySelected && querySelected._id === _id}
                >
                  {name}
                </ListItem>
              );
            })}
          </List>
        )}
      </CardContentQuery>
      <CardContentSettingsQuery>
        <CardHeaderStyled title="Settings" titleTypographyProps={{ variant: 'body1' }} />
        <CardContentStyled>
          {!querySelected && (
            <Alert severity="info">You should select one query for modify it</Alert>
          )}
          {querySelected && (
            <div>
              <Form>
                <TextField label="Name" name="name" value={querySelected.name} />
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
                  <>
                    <TextField label="Query" name="query" />
                    <TextField label="Projection" name="projection" />
                    <TextField label="Sort by" name="sortBy" />
                    <TextField label="Limit" name="limit" />
                    <TextField label="Skip" name="skip" />
                  </>
                )}
                {method === 'findOne' && (
                  <>
                    <TextField label="Query" name="query" />
                    <TextField label="Projection" name="projection" />
                    <TextField label="Skip" name="skip" />
                  </>
                )}
                {method === 'count' && <TextField label="Query" name="query" />}
                {method === 'distinct' && (
                  <>
                    <TextField label="Query" name="query" />
                    <TextField label="Field" name="field" />
                    <TextField label="Options" name="option" />
                  </>
                )}
                {method === 'aggregate' && <TextField label="Aggregation" name="aggregation" />}
                {method === 'insertOne' && <TextField label="Insert" name="insert" />}
                {method === 'updateOne' && (
                  <>
                    <TextField label="Query" name="query" />
                    <TextField label="Update" name="update" />
                    <TextField label="Options" name="option" />
                  </>
                )}
                {method === 'deleteOne' && <TextField label="Query" name="query" />}
                {method === 'updateMany' && (
                  <>
                    <TextField label="Query" name="query" />
                    <TextField label="Update" name="update" />
                    <TextField label="Options" name="option" />
                  </>
                )}
              </Form>
            </div>
          )}
        </CardContentStyled>
      </CardContentSettingsQuery>
    </CardStyled>
  );
};

export { Query };
