import React, { useState, useEffect } from 'react';
import { useGridSignals } from '@ombori/grid-signals-react';
import { useGridSignalsInitParams } from '@ombori/ga-settings';
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
  const signalInitParams = useGridSignalsInitParams();
  const [isActivePlaylistItem, setIsActivePlaylist] = useState(false);

  const gridProductsClient = useGridProductsClient(isDev ? {
    tenantId: REACT_APP_TENANT_ID,
    dataResidency: (REACT_APP_DATA_RESIDENCY) as DataResidencyEnum,
    environment: REACT_APP_ENVIRONMENT,
    locale: IsoLanguageIds.sv_SE,
  } : { locale: IsoLanguageIds.sv_SE });

  useEffect(() => {
    const onEvent = (event: any) => {
      const { data } = event;
      switch (data.type) {
        case 'IS_ACTIVE_NESTED_GRIDAPP':
          setIsActivePlaylist(!!data.value);
          break;
      }
    };
    window.addEventListener('message', onEvent, false);

    return () => {
      window.removeEventListener('message', onEvent, false);
    };
  }, []);

  if (!isSignalsReady || !gridProductsClient) {
    return <div className='init'>Initializing App...</div>
  }

  return (
    <GridPimProvider client={gridProductsClient}>
      <App isActiveItem={isActivePlaylistItem} />
    </GridPimProvider>
  );
}

export default Init;
