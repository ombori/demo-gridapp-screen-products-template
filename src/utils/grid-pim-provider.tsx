import React, { createContext, useContext } from 'react';
import { GridProductServiceClient } from '@ombori/grid-products-client-react';

const GridPimContext = createContext<GridProductServiceClient | null>(null);

interface GridPimProviderProps {
  children: React.ReactNode;
  client: GridProductServiceClient;
}

const GridPimProvider: React.FC<GridPimProviderProps> = ({
  children,
  client,
}): JSX.Element => {
  return <GridPimContext.Provider value={client}>{children}</GridPimContext.Provider>;
};

export const useGridPimClient = (): GridProductServiceClient => {
  const ctx = useContext(GridPimContext);

  if (!ctx) {
    throw new Error(
      'Error caught while consuming GridPimContext context. Make sure you wrap the Component inside the "GridPimProvider".',
    );
  }

  return ctx;
};

export default GridPimProvider;
