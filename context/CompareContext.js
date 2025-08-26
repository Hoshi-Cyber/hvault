import { createContext, useContext, useState } from 'react';

/**
 * CompareContext provides a simple state container for managing
 * domain comparison selections across pages. The compare tray is
 * restricted to a maximum of four items. Attempting to add more
 * items will silently ignore the request.
 */
const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [selected, setSelected] = useState([]);

  const add = (domain) => {
    setSelected((prev) => {
      if (prev.find((d) => d.slug === domain.slug) || prev.length >= 4) {
        return prev;
      }
      return [...prev, domain];
    });
  };

  const remove = (slug) => {
    setSelected((prev) => prev.filter((d) => d.slug !== slug));
  };

  const clear = () => setSelected([]);

  return (
    <CompareContext.Provider value={{ selected, add, remove, clear }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}