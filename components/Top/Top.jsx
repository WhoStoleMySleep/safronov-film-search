'use client';
import React from 'react';
import Link from 'next/link';
import './Top.css';

export default function Top({ text }) {
  return (
    <header className="top">
      <Link href="/" className="top__logo" />
      <h1 className="top__title">{text}</h1>
    </header>
  );
}
