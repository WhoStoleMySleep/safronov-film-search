'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import './FilterCheckbox.css';

export default function FilterCheckbox({ handleChangeCheckbox, onCheckedSaved, handleChangeCheckboxSaved }) {
  const pathname = usePathname();
  return (
    <div className="filter-checkbox">
      {pathname === '/movies' && (
        <input type="checkbox" onChange={handleChangeCheckbox}
          defaultChecked={typeof window !== 'undefined' ? localStorage.getItem('filter-checkbox') : false} />
      )}
      {pathname === '/saved-movies' && (
        <input type="checkbox" value={onCheckedSaved} checked={onCheckedSaved} onChange={handleChangeCheckboxSaved} />
      )}
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}
