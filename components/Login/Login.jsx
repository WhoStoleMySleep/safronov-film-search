'use client';
import React from 'react';
import Link from 'next/link';
import './Login.css';

export default function Login({ handleChangeInput, onSubmit, email, password, isValid, errors }) {
  return (
    <main className="login">
      <form name="formLogin" className="login__form" onSubmit={onSubmit} noValidate>
        <label className="login__label">
          <span className="login__input-name">E-mail</span>
          <input className={`login__input ${errors.email ? 'login__input_type_error' : ''}`}
            type="email" name="email" minLength={5} maxLength={40} required value={email}
            placeholder="Почта" onChange={handleChangeInput} />
          <span className={`login__input-error-message-live ${errors.email ? 'login__input-error-message-live_visible' : ''}`}>
            {errors.email}
          </span>
        </label>
        <label className="login__label">
          <span className="login__input-name">Пароль</span>
          <input className={`login__input ${errors.password ? 'login__input_type_error' : ''}`}
            type="password" name="password" minLength={2} maxLength={10} required value={password}
            placeholder="Пароль" onChange={handleChangeInput} />
          <span className={`login__input-error-message-live ${errors.password ? 'login__input-error-message-live_visible' : ''}`}>
            {errors.password}
          </span>
        </label>
        <button aria-label="Войти" disabled={!isValid}
          className={`login__button ${isValid ? '' : 'login__button_disabled'}`} type="submit">
          Войти
        </button>
        <div className="login__box">
          <p className="login__text">Ещё не зарегистрированы?</p>
          <Link href="/signup" className="login__link">Регистрация</Link>
        </div>
      </form>
    </main>
  );
}
