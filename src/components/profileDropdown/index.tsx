import React, { useState } from 'react';
import { Avatar, Menu } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectProfile } from '@/store/slices/profile';
import { LogoutButton } from '@/components/profileDropdown/logoutButton';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const ProfileAvatar = styled(Avatar)({
  cursor: 'pointer',
});

const ProfileDropdown: React.FC = () => {
  const { profile } = useSelector(selectProfile);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ProfileAvatar onClick={handleMenuOpen} />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <div className="flex flex-col gap-y-3 px-2">
          <Link href={ROUTES['profile']}>Profile</Link>
          <LogoutButton />
        </div>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
