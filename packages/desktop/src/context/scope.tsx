import React, { createContext } from 'react';

import { Scope } from '../interfaces/Scopes';

const scopeContext = createContext<{
  open: boolean;
  toggle: () => void;
  addScope: (scopes: Scope) => void;
  removeScope: (nameParams: string) => void;
  scopes: Scope[];
}>({
  open: false,
  toggle: () => {},
  addScope: () => {},
  removeScope: () => {},
  scopes: []
});

interface ScopeProviderProps {
  children: React.ReactNode;
}
const ScopeProvider: React.FC<ScopeProviderProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [scopes, setScopes] = React.useState<Scope[]>([]);

  const toggle = () => setOpen(!open);
  const removeScope = (nameParams: string) => setScopes(scopes.filter(({ name }) => name !== nameParams));
  const addScope = (scope: Scope) => setScopes([...scopes, scope]);

  return (
    <scopeContext.Provider value={{ open, toggle, scopes, removeScope, addScope }}>
      {React.useMemo(() => children, [children])}
    </scopeContext.Provider>
  );
};

export { ScopeProvider, scopeContext };
