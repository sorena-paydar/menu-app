import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ProfileDropdown from '@/components/profileDropdown';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { selectProfile } from '@/store/slices/profile';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const { profile } = useSelector(selectProfile);

  return (
    <AppBar position="fixed">
      <Toolbar className="flex justify-between">
        <Link href={ROUTES['home']}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu App
          </Typography>
        </Link>

        {profile && <ProfileDropdown />}
      </Toolbar>
    </AppBar>
  );
};
