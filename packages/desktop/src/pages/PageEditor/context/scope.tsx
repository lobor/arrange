import React, { createContext } from 'react';
import omit from 'lodash/omit';

import { Component } from 'interfaces/Components';
import { Queries } from 'interfaces/Queries';
import { Scope, ScopeQueries } from 'interfaces/Scopes';
import { client } from 'interfaces/Fetch';

type ScopeType = 'queries' | 'components';
interface ScopeProviderProps {
  children: React.ReactNode;
}

interface ScopeState {
  components?: {
    [name: string]: Scope;
  };
  queries?: {
    [name: string]: ScopeQueries;
  };
}

const scopeContext = createContext<{
  open: boolean;
  toggle: () => void;
  addScopes: (scopes: (Component | Queries)[], type?: 'queries') => void;
  removeScope: (nameParams: string) => void;
  callFetch: (
    queryId: string,
    scope: {
      [name: string]: Scope;
    }
  ) => Promise<ScopeQueries>;
  updateScope: (
    scopeName: string,
    scopesParam: (Component | Queries) & { value?: string | number },
    type: ScopeType
  ) => void;
  scopes: ScopeState;
  queries: { [key: string]: ScopeQueries };
}>({
  open: false,
  toggle: () => {},
  addScopes: () => {},
  removeScope: () => {},
  updateScope: () => {},
  callFetch: () => Promise.resolve({} as ScopeQueries),
  scopes: {},
  queries: {}
});

const formatComponentToScope = (comp: Component) => {
  const scope = omit<Scope>(comp, ['name', 'page', '__v', 'type']) as Scope;
  scope.value = scope.value || scope.defaultValue || '';
  return scope;
};
const formatQueriesToScope = (comp: Queries) => {
  const scope = omit<ScopeQueries>(comp, ['name']) as ScopeQueries;
  return scope;
};

const ScopeProvider: React.FC<ScopeProviderProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [scopes, setScopes] = React.useState<ScopeState>({ components: {}, queries: {} });
  const [queries, setQueries] = React.useState<{ [key: string]: ScopeQueries }>({});

  const toggle = () => setOpen(!open);
  const removeScope = (nameParams: string) => {
    const scopesTmp: ScopeState = {};
    if (scopes.components) {
      Object.keys(scopes.components).forEach(name => {
        if (name !== nameParams) {
          if (!scopesTmp.components) scopesTmp.components = {};
          scopesTmp.components[name] = scopes.components![name];
        }
      });
    }
    setScopes(scopesTmp);
  };
  const addScopes = async (scopesParam: (Component | Queries)[], type?: ScopeType) => {
    const scopesToAdd: ScopeState = { ...scopes };
    for (const scope of scopesParam) {
      if (type && type === 'queries') {
        if (!scopesToAdd.queries) scopesToAdd.queries = {};
        scopesToAdd.queries[scope.name] = formatQueriesToScope(scope as Queries);
      } else {
        if (!scopesToAdd.components) scopesToAdd.components = {};
        scopesToAdd.components![scope.name] = {
          ...(scopesToAdd.components![scope.name] || {}),
          ...formatComponentToScope(scope as Component)
        };
      }
    }
    setScopes(scopesToAdd);
  };
  const updateScope = async (
    scopeName: string,
    scopesParam: Component | Queries,
    type: ScopeType
  ) => {
    const scopesToModify: ScopeState = { ...scopes };
    switch (type) {
      case 'queries':
        if (scopesToModify.queries![scopeName]) {
          scopesToModify.queries![scopeName] = formatQueriesToScope(scopesParam as Queries);
        }
        break;
      case 'components':
        if (scopesToModify.components![scopeName]) {
          scopesToModify.components![scopeName] = {
            ...scopesToModify.components![scopeName],
            ...formatComponentToScope(scopesParam as Component)
          };
        }
        break;
    }
    setScopes(scopesToModify);
  };

  const callFetch = async (
    queryId: string,
    scope: {
      [name: string]: Scope;
    }
  ) => {
    const { data } = await client.get(`/fetch`, {
      params: { queryId, scope }
    });
    return data;
  };

  React.useEffect(() => {
    (async function() {
      const keys = Object.keys(scopes.queries || {});
      const queries: { [key: string]: ScopeQueries } = {};
      for (const key of keys) {
        if (scopes.queries && scopes.queries[key]) {
          const query = scopes.queries[key];
          if (query.onLoad) {
            const data = await callFetch(query._id, scopes.components || {});
            queries[key] = data;
          }
        }
      }
      setQueries(queries);
    })();
  }, [setQueries, scopes]);

  return (
    <scopeContext.Provider
      value={{ open, toggle, queries, scopes, removeScope, addScopes, updateScope, callFetch }}
    >
      {React.useMemo(() => children, [children])}
    </scopeContext.Provider>
  );
};

export { ScopeProvider, scopeContext };
