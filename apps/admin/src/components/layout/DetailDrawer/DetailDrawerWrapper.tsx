import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box, { BoxProps } from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { WithChildren } from '@common';

interface DetailDrawerProps extends WithChildren {
  rootPath: string;
  boxProps?: BoxProps;
}

const DetailDrawerWrapper = ({ children, rootPath, boxProps }: DetailDrawerProps) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const closeHandler = () => navigate(rootPath);

  useEffect(() => setOpen(!!id), [id]);

  return (
    <Drawer
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            md: '75vw',
          },
        },
      }}
      anchor="right"
      onClose={closeHandler}
      open={open}
    >
      <Box sx={{ width: '100%', height: '100%' }} {...boxProps}>
        {open && children}
      </Box>
    </Drawer>
  );
};

export default DetailDrawerWrapper;
