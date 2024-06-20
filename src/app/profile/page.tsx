'use client';

import { ChangePassword } from '@/app/profile/components/changePassword';

interface Props {}

export default function Profile() {
  return (
    <div className="flex flex-col px-5">
      <ChangePassword />
    </div>
  );
}
