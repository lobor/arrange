import React, { createContext } from 'react';

const dragContext = createContext<{
  setElementDrag: (item?: { w: number; h: number }) => void;
  elementDrag?: { w: number; h: number };
}>({
  setElementDrag: () => {}
});

interface DragProviderProps {
  children: React.ReactNode;
}
const DragProvider: React.FC<DragProviderProps> = ({ children }) => {
  const [elementDrag, setElementDrag] = React.useState<{ w: number; h: number }>();

  return (
    <dragContext.Provider value={{ setElementDrag, elementDrag }}>
      {React.useMemo(() => children, [children])}
    </dragContext.Provider>
  );
};

export { DragProvider, dragContext };
