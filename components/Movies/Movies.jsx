'use client';
import React from 'react';
import SearchForm from '@/components/SearchForm/SearchForm';
import Preloader from '@/components/Preloader/Preloader';
import MoviesCardList from '@/components/MoviesCardList/MoviesCardList';

export default function Movies({ isLoading, onDelete, movieList, savedMovieList, savedMoviesFilter, handleSubmitSearchForm, buttonAddMovies, setButtonAddMovies, onSave, searchBar, handleChangeInput, arrMovies, arrSavedMovies, handleChangeCheckbox, errorTextMovies, errorTextSavedMovies, onCheckedSaved, handleChangeCheckboxSaved, isValidSearch }) {
  return (
    <main className="movies">
      {!isLoading ? (
        <>
          <SearchForm handleSubmitSearchForm={handleSubmitSearchForm} searchBar={searchBar}
            handleChangeInput={handleChangeInput} handleChangeCheckbox={handleChangeCheckbox}
            onCheckedSaved={onCheckedSaved} handleChangeCheckboxSaved={handleChangeCheckboxSaved}
            isValidSearch={isValidSearch} />
          <MoviesCardList onDelete={onDelete} movieList={movieList} savedMovieList={savedMovieList}
            savedMoviesFilter={savedMoviesFilter} buttonAddMovies={buttonAddMovies}
            setButtonAddMovies={setButtonAddMovies} onSave={onSave} arrMovies={arrMovies}
            arrSavedMovies={arrSavedMovies} errorTextMovies={errorTextMovies} errorTextSavedMovies={errorTextSavedMovies} />
        </>
      ) : <Preloader />}
    </main>
  );
}
