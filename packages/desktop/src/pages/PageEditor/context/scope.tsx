import React, { createContext } from 'react';
import axios from 'axios';
import omit from 'lodash/omit';

import { Component } from 'interfaces/Components';
import { Queries, QueriesRest } from 'interfaces/Queries';
import { Scope, ScopeQueries } from 'interfaces/Scopes';

interface ScopeProviderProps {
  children: React.ReactNode;
}

interface ScopeState {
  components?: {
    [name: string]: Scope;
  },
  queries?: {
    [name: string]: ScopeQueries;
  }
}

const scopeContext = createContext<{
  open: boolean;
  toggle: () => void;
  addScopes: (scopes: (Component | Queries)[], type?: 'queries') => void;
  removeScope: (nameParams: string) => void;
  updateScope: (scopeName: string, scopesParam: Component & { value?: string | number }) => void;
  scopes: ScopeState;
}>({
  open: false,
  toggle: () => {},
  addScopes: () => {},
  removeScope: () => {},
  updateScope: () => {},
  scopes: {}
});

const formatComponentToScope = (comp: Component) => {
  const scope = omit<Scope>(comp, ['_id', 'name', 'page', '__v', 'type']) as Scope;
  scope.value = scope.value || scope.defaultValue || '';
  return scope;
};
const formatQueriesToScope = (comp: Queries) => {
  const scope = omit<ScopeQueries>(comp, ['_id', 'name']) as ScopeQueries;
  return scope;
};

const ScopeProvider: React.FC<ScopeProviderProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [scopes, setScopes] = React.useState<ScopeState>({ components: {}, queries: {} });

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
  const addScopes = async (scopesParam: (Component | Queries)[], type?: 'queries') => {
    const scopesToAdd: ScopeState = {};
    for (const scope of scopesParam) {
      if (type && type === 'queries') {
        if (!scopesToAdd.queries) scopesToAdd.queries = {}
        const { url, path } = (scope as unknown) as QueriesRest;
        const { data } = await axios.get(`${url}${path}`)
        scopesToAdd.queries[scope.name] = formatQueriesToScope(data as Queries);
      } else {
        if (!scopesToAdd.components) scopesToAdd.components = {}
        scopesToAdd.components[scope.name] = formatComponentToScope(scope as Component);
      }
    }
    setScopes({ ...scopes, ...scopesToAdd });
  };
  const updateScope = (scopeName: string, scopesParam: Component & { value?: string | number }) => {
    setScopes({ ...scopes, [scopeName]: formatComponentToScope(scopesParam) });
  };

  return (
    <scopeContext.Provider value={{ open, toggle, scopes, removeScope, addScopes, updateScope }}>
      {React.useMemo(() => children, [children])}
    </scopeContext.Provider>
  );
};

export { ScopeProvider, scopeContext };
