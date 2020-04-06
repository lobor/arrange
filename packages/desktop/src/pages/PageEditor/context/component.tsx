import React, { createContext } from 'react';

import { Component } from 'interfaces/Components';

const componentContext = createContext<{
  open: boolean;
  toggle: () => void;
  toggleItem: (item?: Component) => void;
  item?: Component;
}>({
  open: false,
  toggle: () => {},
  toggleItem: () => {}
});

interface ComponentProviderProps {
  children: React.ReactNode;
}
const ComponentProvider: React.FC<ComponentProviderProps> = ({ children }) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [item, setItem] = React.useState<Component>();

  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [open]);
  const toggleItem = React.useCallback(
    (itemToSelect?: Component) => {
      if (!itemToSelect || !item || itemToSelect._id !== item._id) {
        setItem(itemToSelect);
        if (!open) {
          setOpen(true);
        }
      }
    },
    [setItem, item, open]
  );

  return (
    <componentContext.Provider value={{ open, toggle, item, toggleItem }}>
      {React.useMemo(() => children, [children])}
    </componentContext.Provider>
  );
};

export { ComponentProvider, componentContext };
