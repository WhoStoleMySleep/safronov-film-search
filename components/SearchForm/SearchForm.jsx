'use client';
import React from 'react';
import FilterCheckbox from '@/components/FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ handleSubmitSearchForm, searchBar, handleChangeInput, handleChangeCheckbox, onCheckedSaved, handleChangeCheckboxSaved, isValidSearch }) {
  return (
    <section className="search-form">
      <form name="formSearch" className="search-form__form" onSubmit={handleSubmitSearchForm} noValidate>
        <div className="search-form__box">
          <input className="search-form__input" required placeholder="Фильм" minLength="1" name="film" value={searchBar} onChange={handleChangeInput} />
          <button className="search-form__button" type="submit">Найти</button>
        </div>
        {!isValidSearch && <span className="search-form__error">Нужно ввести ключевое слово</span>}
        <FilterCheckbox handleChangeCheckbox={handleChangeCheckbox} onCheckedSaved={onCheckedSaved} handleChangeCheckboxSaved={handleChangeCheckboxSaved} />
      </form>
    </section>
  );
}
