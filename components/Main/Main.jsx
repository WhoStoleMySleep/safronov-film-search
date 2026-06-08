import React from 'react';
import './Main.css';
import AboutProject from '@/components/AboutProject/AboutProject';
import NavTab from '@/components/NavTab/NavTab';
import Techs from '@/components/Techs/Techs';
import AboutMe from '@/components/AboutMe/AboutMe';

export default function Main() {
  return (
    <main className="main">
      <AboutProject />
      <NavTab />
      <Techs />
      <AboutMe />
    </main>
  );
}
