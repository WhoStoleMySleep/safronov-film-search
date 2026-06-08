'use client';
import React from 'react';
import { CurrentUserContext } from '@/contexts/AppContext';
import './Profile.css';

export default function Profile({ loggedIn, removeJwt, isValid, errors, onSubmit, handleChangeInput, disabledInput, handleDisabledInput, formValue, inputChange }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="profile" id="profile">
      <h1 className="profile__title">Привет, {currentUser?.name ?? ''}!</h1>
      <form name="formProfile" className="profile__form" onSubmit={onSubmit}>
        <label className="profile__label">
          <span className="profile__input-name">Имя</span>
          <input className={`profile__input ${errors.name ? 'profile__input_type_error' : ''}`}
            type="text" name="name" minLength={2} maxLength={30} required placeholder="Имя"
            pattern="[А-Яа-яA-Za-z\s\-Ёё]+" onChange={handleChangeInput}
            value={!inputChange.name && currentUser ? currentUser.name : formValue.name}
            disabled={disabledInput} />
        </label>
        <label className="profile__label">
          <span className="profile__input-name">E-mail</span>
          <input className={`profile__input ${errors.email ? 'profile__input_type_error' : ''}`}
            type="email" name="email" minLength={5} maxLength={40} required placeholder="Почта"
            value={!inputChange.email && currentUser ? currentUser.email : formValue.email}
            disabled={disabledInput} onChange={handleChangeInput} />
        </label>
        {loggedIn && disabledInput ? (
          <>
            <button aria-label="Редактировать" className="profile__button" type="button" onClick={handleDisabledInput}>Редактировать</button>
            <button aria-label="Выйти" className="profile__button profile__button_color_main" type="button" onClick={removeJwt}>Выйти из аккаунта</button>
          </>
        ) : (
          <>
            <span className={`profile__input-error-message-web ${errors.name || errors.email ? 'profile__input-error-message-web_visible' : ''}`}>
              {errors.name || errors.email}
            </span>
            <button aria-label="Сохранить" disabled={!isValid}
              className={`profile__button-save ${isValid ? '' : 'profile__button-save_disabled'}`} type="submit">
              Сохранить
            </button>
          </>
        )}
      </form>
    </main>
  );
}
