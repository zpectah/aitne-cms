import CircularProgress from '@mui/material/CircularProgress';

import { PreloaderBase } from '../components';

const AppPreloader = () => (
  <PreloaderBase>
    <CircularProgress disableShrink />
  </PreloaderBase>
);

export default AppPreloader;
