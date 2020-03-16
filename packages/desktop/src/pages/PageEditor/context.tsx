import React, { createContext } from 'react';

const componentContext = createContext({
  open: false,
  toggle: () => {}
});
const queryContext = createContext({
  open: false,
  toggle: () => {}
});

interface ComponentProviderProps {
  children: React.ReactNode;
}
const ComponentProvider: React.FC<ComponentProviderProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const toggle = React.useCallback(() => {
    setOpen(!open)
  }, [open]);
  return (
    <componentContext.Provider value={{ open, toggle }}>
      {React.useMemo(() => children, [children])}
    </componentContext.Provider>
  );
};

interface QueryProviderProps {
  children: React.ReactNode;
}
const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const toggle = React.useCallback(() => {
    setOpen(!open)
  }, [open]);
  return (
    <queryContext.Provider value={{ open, toggle }}>
      {React.useMemo(() => children, [children])}
    </queryContext.Provider>
  );
};

export { ComponentProvider, QueryProvider, componentContext, queryContext };
