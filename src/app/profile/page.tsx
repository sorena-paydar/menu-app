'use client';

import { ChangePassword } from '@/app/profile/components/changePassword';
import { ChangePersonalInformation } from '@/app/profile/components/changePersonalInformation';

interface Props {}

export default function Profile() {
  return (
    <div className="flex flex-col px-5 gap-y-5 mt-5">
      <ChangePersonalInformation />

      <ChangePassword />
    </div>
  );
}
