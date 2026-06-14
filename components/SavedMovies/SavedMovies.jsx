'use client';
import React from 'react';
import SearchForm from '@/components/SearchForm/SearchForm';
import Preloader from '@/components/Preloader/Preloader';
import MoviesCardList from '@/components/MoviesCardList/MoviesCardList';
import FolderTabs from '@/components/FolderTabs/FolderTabs';

export default function SavedMovies({ isLoading, onDelete, movieList, savedMovieList, savedMoviesFilter, handleSubmitSearchForm, buttonAddMovies, setButtonAddMovies, onSave, searchBar, handleChangeInput, arrMovies, arrSavedMovies, handleChangeCheckbox, errorTextMovies, errorTextSavedMovies, onCheckedSaved, handleChangeCheckboxSaved, isValidSearch, folders, activeFolderId, onFolderSelect, onCreateFolder, onDeleteFolder, onRenameFolder, onMoveToFolder }) {
  return (
    <div className="savedMovies">
      {!isLoading ? (
        <>
          <SearchForm handleSubmitSearchForm={handleSubmitSearchForm} searchBar={searchBar}
            handleChangeInput={handleChangeInput} handleChangeCheckbox={handleChangeCheckbox}
            onCheckedSaved={onCheckedSaved} handleChangeCheckboxSaved={handleChangeCheckboxSaved}
            isValidSearch={isValidSearch} />
          <FolderTabs folders={folders} activeFolderId={activeFolderId}
            onFolderSelect={onFolderSelect} onCreateFolder={onCreateFolder}
            onDeleteFolder={onDeleteFolder} onRenameFolder={onRenameFolder} />
          <MoviesCardList onDelete={onDelete} movieList={movieList} savedMovieList={savedMovieList}
            savedMoviesFilter={savedMoviesFilter} buttonAddMovies={buttonAddMovies}
            setButtonAddMovies={setButtonAddMovies} onSave={onSave} arrMovies={arrMovies}
            arrSavedMovies={arrSavedMovies} errorTextMovies={errorTextMovies}
            errorTextSavedMovies={errorTextSavedMovies} folders={folders}
            onMoveToFolder={onMoveToFolder} />
        </>
      ) : <Preloader />}
    </div>
  );
}
