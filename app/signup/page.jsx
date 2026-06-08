'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/contexts/AppContext';
import Top from '@/components/Top/Top';
import Register from '@/components/Register/Register';

export default function SignUpPage() {
  const { loggedIn, authProps, handleSubmitRegister } = React.useContext(AppContext);
  const router = useRouter();
  React.useEffect(() => { if (loggedIn) router.replace('/'); }, [loggedIn]);
  if (loggedIn) return null;
  return (<><Top text="Добро пожаловать!" /><Register {...authProps} onSubmit={handleSubmitRegister} /></>);
}
