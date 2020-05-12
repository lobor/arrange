import React, { createContext } from 'react';

const navBarContext = createContext({
  edit: false,
  toggleEdit: () => {}
});

interface NavBarProviderProps {
  children: React.ReactNode;
}
const NavBarProvider: React.FC<NavBarProviderProps> = ({ children }) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const toggleEdit = React.useCallback(() => setEdit(!edit), [edit]);
  return (
    <navBarContext.Provider value={{ edit, toggleEdit }}>
      {React.useMemo(() => children, [children])}
    </navBarContext.Provider>
  );
};

export { NavBarProvider, navBarContext };
