import CircularProgress from '@mui/material/CircularProgress';

import { PreloaderBase } from '../../Preloader';

const PageLayoutPreloader = () => (
  <PreloaderBase>
    <CircularProgress disableShrink />
  </PreloaderBase>
);

export default PageLayoutPreloader;
