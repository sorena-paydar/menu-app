'use client';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { Signup } from '@/app/register/components/signup';
import { Login } from '@/app/register/components/login';
import classnames from 'classnames';
import Cookies from 'js-cookie';
import { COOKIES } from '@/constants/auth';
import { ROUTES } from '@/constants/routes';

export type RegisterTabs = Record<
  'signup' | 'login',
  { label: string; value: string }
>;

const registerTabs: RegisterTabs = {
  signup: {
    label: 'Sign up',
    value: 'signup',
  },
  login: {
    label: 'Login',
    value: 'login',
  },
};

export default function Register() {
  const [tabValue, setTabValue] = useState<keyof RegisterTabs>('signup');

  const switchTab = (tab: keyof RegisterTabs) => {
    setTabValue(tab);
  };

  const authToken = Cookies.get(COOKIES['authToken']);

  if (authToken) {
    window.location.href = ROUTES['home'];

    return <span />;
  }

  return (
    <div
      className={classnames(
        'min-h-screen flex flex-col justify-center items-center px-8',
      )}
    >
      <Box className="border border-gray-200 rounded-lg px-5 py-4 w-full">
        <TabContext value={tabValue}>
          <Box>
            <TabList
              onChange={(_, value) => switchTab(value)}
              aria-label="login-tabs"
            >
              <Tab
                label={registerTabs.signup.label}
                value={registerTabs.signup.value}
                className="flex-grow"
              />

              <Tab
                label={registerTabs.login.label}
                value={registerTabs.login.value}
                className="flex-grow"
              />
            </TabList>
          </Box>

          <TabPanel
            value={registerTabs.signup.value}
            className="px-0 pb-0 pt-5"
          >
            <Signup switchTab={switchTab} />
          </TabPanel>

          <TabPanel value={registerTabs.login.value} className="px-0 pb-0 pt-5">
            <Login switchTab={switchTab} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
