'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/contexts/AppContext';
import Top from '@/components/Top/Top';
import Login from '@/components/Login/Login';

export default function SignInPage() {
  const { loggedIn, authProps, handleSubmitLogin } = React.useContext(AppContext);
  const router = useRouter();
  React.useEffect(() => { if (loggedIn) router.replace('/'); }, [loggedIn]);
  if (loggedIn) return null;
  return (<><Top text="Рады видеть!" /><Login {...authProps} onSubmit={handleSubmitLogin} /></>);
}
