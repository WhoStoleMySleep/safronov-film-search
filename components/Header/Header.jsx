'use client';
import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn, isOpenPopupMenu }) {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (width > 768) {
    return (
      <header className="header">
        {loggedIn ? (
          <nav className="header__navigation">
            <Link href="/" className="header__link header__link-logo" />
            <Navigation />
            <Link href="/profile" className="header__link header__link-profile">Аккаунт</Link>
          </nav>
        ) : (
          <nav className="header__navigation">
            <Link href="/" className="header__link header__link-logo" />
            <ul className="header__navigation-unauthorized-items">
              <li className="header__navigation-unauthorized-item">
                <Link href="/signup" className="header__link header__link-register">Регистрация</Link>
              </li>
              <li className="header__navigation-unauthorized-item">
                <Link href="/signin" className="header__link header__link-login">Войти</Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    );
  }

  return (
    <header className="header">
      {loggedIn ? (
        <nav className="header__navigation">
          <Link href="/" className="header__link header__link-logo" />
          <button onClick={isOpenPopupMenu} aria-label="Меню" className="header__popup" type="button" />
        </nav>
      ) : (
        <nav className="header__navigation">
          <Link href="/" className="header__link header__link-logo" />
          <ul className="header__navigation-unauthorized-items">
            <li className="header__navigation-unauthorized-item">
              <Link href="/signup" className="header__link header__link-register">Регистрация</Link>
            </li>
            <li className="header__navigation-unauthorized-item">
              <Link href="/signin" className="header__link header__link-login">Войти</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
