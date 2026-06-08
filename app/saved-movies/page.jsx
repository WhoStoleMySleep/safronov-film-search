'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/contexts/AppContext';
import SavedMovies from '@/components/SavedMovies/SavedMovies';
import Footer from '@/components/Footer/Footer';

export default function SavedMoviesPage() {
  const { loggedIn, movieProps } = React.useContext(AppContext);
  const router = useRouter();
  React.useEffect(() => { if (loggedIn === false) router.replace('/'); }, [loggedIn]);
  if (!loggedIn) return null;
  return (<><SavedMovies {...movieProps} /><Footer /></>);
}
