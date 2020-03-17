import React, { createContext } from 'react';

export interface Item {
  _id?: string;
  name: string;
  position: {
    x: number;
    y: number;
  } | null;
  type: string;
}

const componentContext = createContext<{
  open: boolean;
  toggle: () => void;
  toggleItem: (item?: Item) => void;
  item?: Item;
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
  const [item, setItem] = React.useState<Item>();

  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [open]);
  const toggleItem = React.useCallback(
    (item?: Item) => {
      setItem(item);
    },
    [setItem]
  );

  return (
    <componentContext.Provider value={{ open, toggle, item, toggleItem }}>
      {React.useMemo(() => children, [children])}
    </componentContext.Provider>
  );
};

export { ComponentProvider, componentContext };
