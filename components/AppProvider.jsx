'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppContext, CurrentUserContext } from '@/contexts/AppContext';
import Header from '@/components/Header/Header';
import PopupMenu from '@/components/PopupMenu/PopupMenu';
import * as auth from '@/utils/auth';
import mainApi from '@/utils/MainApi';
import moviesApi from '@/utils/MoviesApi';

export default function AppProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesFilter, setSavedMoviesFilter] = React.useState([]);
  const [arrMovies, setArrMovies] = React.useState(true);
  const [arrSavedMovies, setArrSavedMovies] = React.useState(false);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [movies, setMovies] = React.useState([]);
  const [buttonAddMovies, setButtonAddMovies] = React.useState(false);
  const [errorTextMovies, setErrorTextMovies] = React.useState(false);
  const [errorTextSavedMovies, setErrorTextSavedMovies] = React.useState(false);
  const [isValidSearch, setIsValidSearch] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [disabledInput, setDisabledInput] = React.useState(true);
  const [searchFormValue, setSearchFormValue] = React.useState('');
  const [checkboxSaved, setCheckboxSaved] = React.useState(false);
  const [checkbox, setCheckbox] = React.useState(false);
  const [formValue, setFormValue] = React.useState({ name: '', email: '', password: '' });
  const [inputChange, setInputChange] = React.useState({ name: false, email: false });

  React.useEffect(() => { tokenCheck(); }, []);

  React.useEffect(() => {
    if (pathname === '/movies') {
      if (localStorage.getItem('filter-request-text')) {
        setSearchFormValue(localStorage.getItem('filter-request-text'));
        setMovies(JSON.parse(localStorage.getItem('filter-movies')));
        setCheckbox(JSON.parse(localStorage.getItem('filter-checkbox')));
      } else {
        setSearchFormValue('');
      }
    } else if (pathname === '/saved-movies') {
      setSearchFormValue('');
      setSavedMoviesFilter(savedMovies);
      setCheckboxSaved(false);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (!loggedIn) return;
    setInputChange({ name: false, email: false });
    mainApi.getUserInfo().then(setCurrentUser).catch(console.error);
    getSavedMovies();
    if (pathname === '/movies') {
      setIsLoading(true);
      const cached = localStorage.getItem('filter-movies');
      if (cached) {
        setMovies(JSON.parse(cached));
        setSearchFormValue(localStorage.getItem('filter-request-text') ?? '');
        setArrMovies(true);
      }
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (!loggedIn || localStorage.getItem('movies')) return;
    setIsLoading(true);
    moviesApi.getAllMovies().then((data) => {
      localStorage.setItem('movies', JSON.stringify(data));
      setTimeout(() => setIsLoading(false), 500);
    }).catch(console.error);
  }, [loggedIn]);

  React.useEffect(() => { setSavedMoviesFilter(savedMovies); }, [savedMovies]);

  React.useEffect(() => {
    if (!isPopupMenuOpen) return;
    const onEsc = (e) => { if (e.key === 'Escape') setIsPopupMenuOpen(false); };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [isPopupMenuOpen]);

  async function getSavedMovies() {
    setIsLoading(true);
    try {
      const data = await mainApi.getSavedMovies();
      setSavedMovies(data);
      setSavedMoviesFilter(data);
      setTimeout(() => setArrSavedMovies(true), 500);
    } catch (err) { console.error(err); }
    setTimeout(() => setIsLoading(false), 500);
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
    setInputChange((prev) => ({ ...prev, [name]: true }));
    const form = e.target.closest('form');
    setIsValid(form.checkValidity());
    setErrors((prev) => ({ ...prev, [name]: e.target.validationMessage }));
  }

  function handleChangeSearchInput(e) { setSearchFormValue(e.target.value); }

  function handleChangeCheckbox(e) {
    if (!isValidSearch) return;
    const next = !checkbox;
    localStorage.setItem('filter-checkbox', next);
    setCheckbox(next);
    if (e.target.closest('form').checkValidity()) { setIsValidSearch(true); getMovies(next); }
    else setIsValidSearch(false);
  }

  function handleChangeCheckboxSaved(e) {
    const next = !checkboxSaved;
    setCheckboxSaved(next);
    if (e.target.closest('form').checkValidity()) { setIsValidSearch(true); getSavedMoviesFilter(next); }
    else setIsValidSearch(false);
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('filter-movies');
    localStorage.removeItem('filter-request-text');
    localStorage.removeItem('filter-checkbox');
    localStorage.removeItem('movies');
    setLoggedIn(false);
    setSavedMovies([]);
    setSavedMoviesFilter([]);
    setMovies([]);
    setCurrentUser(null);
    setIsValid(false);
    setCheckbox(false);
    setErrorTextMovies(false);
    setErrorTextSavedMovies(false);
    router.push('/');
  }

  function onUpdateUserInfo(name, email) {
    mainApi.updateUserInfo({ name, email }).then(setCurrentUser).catch(console.error);
  }

  function handleSubmitProfile(e) {
    e.preventDefault();
    setInputChange({ name: false, email: false });
    const name = formValue.name || currentUser.name;
    const email = formValue.email || currentUser.email;
    onUpdateUserInfo(name, email);
    setDisabledInput(true);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;
    auth.checkValidityToken(jwt).then((res) => { if (res) setLoggedIn(true); }).catch(console.error);
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    auth.register(formValue.name, formValue.email, formValue.password)
      .then((res) => { if (res) onLogin(); })
      .catch(console.error);
  }

  function handleSubmitLogin(e) { e.preventDefault(); onLogin(); }

  function onLogin() {
    auth.authorize(formValue.email, formValue.password)
      .then((res) => { if (res) { setLoggedIn(true); router.push('/movies'); } })
      .catch(console.error);
  }

  function handleSubmitSearchForm(e) {
    e.preventDefault();
    if (!e.target.checkValidity()) { setIsValidSearch(false); return; }
    setIsValidSearch(true);
    if (pathname === '/movies') getMovies(localStorage.getItem('filter-checkbox'));
    else if (pathname === '/saved-movies') getSavedMoviesFilter(checkboxSaved);
  }

  function getMovies(filterCheckbox) {
    try {
      const all = JSON.parse(localStorage.getItem('movies'));
      const filtered = all.filter((m) =>
        m.nameRU.toLowerCase().includes(searchFormValue.toLowerCase()) ||
        m.nameEN.toLowerCase().includes(searchFormValue.toLowerCase())
      );
      const result = filterCheckbox ? filtered.filter((m) => m.duration < 40) : filtered;
      localStorage.setItem('filter-movies', JSON.stringify(result));
      localStorage.setItem('filter-request-text', searchFormValue);
      if (result.length === 0) { setArrMovies(false); setMovies([]); }
      else { setMovies(result); setButtonAddMovies(true); setArrMovies(true); }
    } catch { setErrorTextMovies(true); }
  }

  function getSavedMoviesFilter(checked) {
    try {
      setIsLoading(true);
      const filtered = savedMovies.filter((m) =>
        m.nameRU.toLowerCase().includes(searchFormValue.toLowerCase()) ||
        m.nameEN.toLowerCase().includes(searchFormValue.toLowerCase())
      );
      const result = checked ? filtered.filter((m) => m.duration < 40) : filtered;
      if (result.length === 0) { setArrSavedMovies(false); setSavedMoviesFilter([]); }
      else { setSavedMoviesFilter(result); setArrSavedMovies(true); }
      setTimeout(() => setIsLoading(false), 500);
    } catch { setErrorTextSavedMovies(true); }
  }

  function handleSaveMovies(movie) {
    mainApi.addMovie(movie).then((data) => setSavedMovies((prev) => [data, ...prev])).catch(console.error);
  }

  function handleDeleteMovies(movie) {
    mainApi.deleteMovie(movie._id).then(() =>
      setSavedMovies((prev) => prev.filter((m) => m._id !== movie._id))
    ).catch(console.error);
  }

  const movieProps = { isLoading, onDelete: handleDeleteMovies, movieList: movies, savedMovieList: savedMovies, savedMoviesFilter, handleSubmitSearchForm, buttonAddMovies, setButtonAddMovies, onSave: handleSaveMovies, searchBar: searchFormValue, handleChangeInput: handleChangeSearchInput, arrMovies, arrSavedMovies, handleChangeCheckbox, errorTextMovies, errorTextSavedMovies, onCheckedSaved: checkboxSaved, handleChangeCheckboxSaved, isValidSearch };

  const profileProps = { loggedIn, removeJwt: handleLogout, onUpdateUserInfo, isValid, errors, onSubmit: handleSubmitProfile, handleChangeInput, disabledInput, handleDisabledInput: () => { setDisabledInput(false); setIsValid(false); }, formValue, inputChange };

  const authProps = { handleChangeInput, isValid, errors, email: formValue.email, password: formValue.password, name: formValue.name };

  return (
    <AppContext.Provider value={{ loggedIn, movieProps, profileProps, authProps, handleSubmitLogin, handleSubmitRegister }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <div className="page">
            <Header loggedIn={loggedIn} isOpenPopupMenu={() => setIsPopupMenuOpen(true)} />
            {children}
            <PopupMenu onClose={() => setIsPopupMenuOpen(false)} isOpen={isPopupMenuOpen} />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}
