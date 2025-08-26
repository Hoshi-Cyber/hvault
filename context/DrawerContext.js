import { createContext, useContext, useState } from 'react';

/**
 * DrawerContext manages the visibility and content of a right-side
 * inquiry drawer used for submitting purchase or lease requests.
 */
const DrawerContext = createContext();

export function DrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [domain, setDomain] = useState(null);

  const open = (domainInfo) => {
    setDomain(domainInfo);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    setDomain(null);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, domain, open, close }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
}