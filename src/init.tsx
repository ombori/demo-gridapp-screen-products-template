import React from 'react';
import { useGridSignals } from '@ombori/grid-signals-react';
import { useSettings } from '@ombori/ga-settings';
import App from './app';
import { Settings } from './types';
import { useHeartbeat } from '@ombori/ga-messaging';

const Init = () => {
  useHeartbeat(); // Used to know if the app crashed, so screen module will auto-restart the browser
  const isSignalsReady = useGridSignals();

  if (!isSignalsReady) {
    return <div className='init'>Initializing App...</div>
  }

  return <App />
}

export default Init;
