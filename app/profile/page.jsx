'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/contexts/AppContext';
import Profile from '@/components/Profile/Profile';

export default function ProfilePage() {
  const { loggedIn, profileProps } = React.useContext(AppContext);
  const router = useRouter();
  React.useEffect(() => { if (loggedIn === false) router.replace('/'); }, [loggedIn]);
  if (!loggedIn) return null;
  return <Profile {...profileProps} />;
}
