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
  callFetch: (keys: string[]) => Promise<void>;
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
  callFetch: async () => {},
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
  const [scopeComponents, setScopeComponents] = React.useState<ScopeState['components']>({});
  const [scopeQueries, setScopeQueries] = React.useState<ScopeState['queries']>({});
  const [queries, setQueries] = React.useState<{ [key: string]: ScopeQueries }>({});

  const toggle = () => setOpen(!open);
  const removeScope = (nameParams: string) => {
    const scopesTmp: ScopeState['components'] = {};
    if (scopeComponents) {
      Object.keys(scopeComponents).forEach(name => {
        if (name !== nameParams) {
          scopesTmp[name] = scopeComponents![name];
        }
      });
    }
    setScopeComponents(scopesTmp);
  };
  const addScopes = async (scopesParam: (Component | Queries)[], type?: ScopeType) => {
    const scopeComponentToAdd: ScopeState['components'] = { ...scopeComponents };
    const scopequeriesToAdd: ScopeState['queries'] = { ...scopeQueries };
    for (const scope of scopesParam) {
      if (type && type === 'queries') {
        scopequeriesToAdd[scope.name] = formatQueriesToScope(scope as Queries);
      } else {
        scopeComponentToAdd![scope.name] = {
          ...(scopeComponentToAdd[scope.name] || {}),
          ...formatComponentToScope(scope as Component)
        };
      }
    }
    if (Object.keys(scopequeriesToAdd).length > 0) {
      setScopeQueries(scopequeriesToAdd);
    }
    if (Object.keys(scopeComponentToAdd).length >0) {
      setScopeComponents(scopeComponentToAdd);
    }
  };
  const updateScope = async (
    scopeName: string,
    scopesParam: Component | Queries,
    type: ScopeType
  ) => {
    const scopeComponentToAdd: ScopeState['components'] = { ...scopeComponents };
    const scopequeriesToAdd: ScopeState['queries'] = { ...scopeQueries };
    switch (type) {
      case 'queries':
        if (scopequeriesToAdd[scopeName]) {
          scopequeriesToAdd[scopeName] = formatQueriesToScope(scopesParam as Queries);
          setScopeQueries(scopequeriesToAdd);
        }
        break;
      case 'components':
        if (scopeComponentToAdd[scopeName]) {
          scopeComponentToAdd[scopeName] = {
            ...scopeComponentToAdd[scopeName],
            ...formatComponentToScope(scopesParam as Component)
          };
          setScopeComponents(scopeComponentToAdd);
        }
        break;
    }

  };

  const callFetch = async (keys: string[], autoSave = true) => {
    const queriesTmp: { [key: string]: ScopeQueries } = { ...queries };
    for (const key of keys) {
      if (scopeQueries && scopeQueries[key]) {
        const query = scopeQueries[key];
        const { data } = await client.get(`/fetch`, {
          params: { queryId: query._id, scope: scopeComponents || {} }
        });
        queriesTmp[key] = data;
      }
    }
    if (autoSave) {
      setQueries(queriesTmp);
    }
  }

  React.useEffect(() => {
    const keys = Object.keys(scopeQueries || {});
    if (keys.length > 0) {
      callFetch(keys.filter((key) => scopeQueries && scopeQueries[key] && scopeQueries[key].onLoad))
    }
  }, [scopeComponents, scopeQueries]);

  return (
    <scopeContext.Provider
      value={{
        open,
        toggle,
        queries,
        scopes: { components: scopeComponents, queries: scopeQueries },
        removeScope,
        addScopes,
        updateScope,
        callFetch
      }}
    >
      {React.useMemo(() => children, [children])}
    </scopeContext.Provider>
  );
};

export { ScopeProvider, scopeContext };
