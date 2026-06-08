'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navigation.css';

export default function Navigation() {
  const pathname = usePathname();
  const linkClass = (path) =>
    pathname === path ? 'navigation__link navigation__link_active' : 'navigation__link';

  return (
    <section className="navigation">
      <ul className="navigation__authorized-items">
        <li className="navigation__authorized-item">
          <Link href="/movies" className={linkClass('/movies')}>Фильмы</Link>
        </li>
        <li className="navigation__authorized-item">
          <Link href="/saved-movies" className={linkClass('/saved-movies')}>Сохранённые фильмы</Link>
        </li>
      </ul>
    </section>
  );
}
