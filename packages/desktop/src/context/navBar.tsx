import React, { createContext } from 'react';

const navBarContext = createContext({
  edit: false,
  toggle: () => {}
});

interface NavBarProviderProps {
  children: React.ReactNode;
}
const NavBarProvider: React.FC<NavBarProviderProps> = ({ children }) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const toggle = React.useCallback(() => setEdit(!edit), [edit]);
  return (
    <navBarContext.Provider value={{ edit, toggle }}>
      {React.useMemo(() => children, [children])}
    </navBarContext.Provider>
  );
};

export { NavBarProvider, navBarContext };
