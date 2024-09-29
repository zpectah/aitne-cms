import { useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AutoModeIcon from '@mui/icons-material/AutoMode';

import { useTheme } from '../../../hooks';
import { themeModeKeys } from '../../../enums';

const HeaderTheme = () => {
  const { mode, toggleMode } = useTheme();

  const renderIcon = useMemo(() => {
    switch (mode) {
      case themeModeKeys.dark:
        return <DarkModeIcon />;
      case themeModeKeys.light:
        return <LightModeIcon />;
      case themeModeKeys.system:
      default:
        return <AutoModeIcon />;
    }
  }, [mode]);

  return (
    <Tooltip title={`Theme: ${mode}`}>
      <IconButton onClick={toggleMode}>{renderIcon}</IconButton>
    </Tooltip>
  );
};

export default HeaderTheme;
