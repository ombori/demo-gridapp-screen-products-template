import React from 'react';
import { useGridSignals } from '@ombori/grid-signals-react';
import {
  useGridProductsClient,
  DataResidencyEnum,
  IsoLanguageIds
} from '@ombori/grid-products-client-react';
import App from './app';
import { useHeartbeat } from '@ombori/ga-messaging';
import GridPimProvider from './utils/grid-pim-provider';

const {
  REACT_APP_ENVIRONMENT,
  REACT_APP_DATA_RESIDENCY,
  REACT_APP_TENANT_ID,
  NODE_ENV,
} = process.env;

const isDev = NODE_ENV === 'development';

const Init = () => {
  useHeartbeat(); // Used to know if the app crashed, so screen module will auto-restart the browser
  const isSignalsReady = useGridSignals();

  const gridProductsClient = useGridProductsClient(isDev ? {
    tenantId: REACT_APP_TENANT_ID,
    dataResidency: (REACT_APP_DATA_RESIDENCY) as DataResidencyEnum,
    environment: REACT_APP_ENVIRONMENT,
    locale: IsoLanguageIds.sv_SE,
  } : { locale: IsoLanguageIds.sv_SE });

  if (!isSignalsReady || !gridProductsClient) {
    return <div className='init'>Initializing App...</div>
  }

  return (
    <GridPimProvider client={gridProductsClient}>
      <App />
    </GridPimProvider>
  );
}

export default Init;
