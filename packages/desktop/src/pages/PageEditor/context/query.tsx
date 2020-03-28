import * as React from 'react';

const queryContext = React.createContext({
  open: false,
  toggle: () => {}
});

interface QueryProviderProps {
  children: React.ReactNode;
}
const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <queryContext.Provider value={{ open, toggle }}>
      {React.useMemo(() => children, [children])}
    </queryContext.Provider>
  );
};

export { QueryProvider, queryContext };
