'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/contexts/AppContext';
import Movies from '@/components/Movies/Movies';
import Footer from '@/components/Footer/Footer';

export default function MoviesPage() {
  const { loggedIn, movieProps } = React.useContext(AppContext);
  const router = useRouter();
  React.useEffect(() => { if (loggedIn === false) router.replace('/'); }, [loggedIn]);
  if (!loggedIn) return null;
  return (<><Movies {...movieProps} /><Footer /></>);
}
