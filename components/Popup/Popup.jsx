'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import popupCloseIcon from '@/images/popup__button-close.svg';
import './Popup.css';

export default function Popup({ name, onClose, isOpen }) {
  const pathname = usePathname();
  const linkClass = (path, extra = '') =>
    `popup__link${extra}${pathname === path ? ' popup__link_active' : ''}`;

  return (
    <div className={`popup popup_place_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_place_${name}`}>
        <button aria-label="Закрыть" type="button" className="popup__button-close" onClick={onClose}>
          <img className="popup__close-icon" src={popupCloseIcon.src} alt="Закрыть" />
        </button>
        <div className="popup__box">
          <Link href="/" className={linkClass('/')} onClick={onClose}>Главная</Link>
          <Link href="/movies" className={linkClass('/movies')} onClick={onClose}>Фильмы</Link>
          <Link href="/saved-movies" className={linkClass('/saved-movies', ' popup__link_size_m')} onClick={onClose}>Сохранённые фильмы</Link>
        </div>
        <Link href="/profile" className="popup__link-profile" onClick={onClose}>Аккаунт</Link>
      </div>
    </div>
  );
}
