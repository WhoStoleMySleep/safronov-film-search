'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppContext, CurrentUserContext } from '@/contexts/AppContext';
import Header from '@/components/Header/Header';
import PopupMenu from '@/components/PopupMenu/PopupMenu';
import * as auth from '@/utils/auth';
import mainApi from '@/utils/MainApi';

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
      setSearchFormValue('');
      setMovies([]);
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
      const data = await mainApi.getRutubeSaved();
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
    if (pathname === '/movies') getMovies(checkbox);
    else if (pathname === '/saved-movies') getSavedMoviesFilter(checkboxSaved);
  }

  async function getMovies(filterCheckbox) {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://rutube.ru/api/search/video/?query=${encodeURIComponent(searchFormValue)}&format=json&page=1&pageSize=20`
      );
      const data = await res.json();
      const raw = data.results ?? [];
      const all = raw.map((v) => ({
        id: String(v.id ?? v.video_url?.split('/').filter(Boolean).pop() ?? ''),
        title: v.title ?? '',
        thumbnail: v.thumbnail_url ?? '',
        authorName: v.author?.name ?? '',
        duration: Math.round((v.duration ?? 0) / 60),
        url: v.video_url ?? '',
      }));
      const result = filterCheckbox ? all.filter((m) => m.duration < 40) : all;
      if (result.length === 0) { setArrMovies(false); setMovies([]); }
      else { setMovies(result); setArrMovies(true); }
    } catch { setErrorTextMovies(true); }
    setIsLoading(false);
  }

  function getSavedMoviesFilter(checked) {
    try {
      setIsLoading(true);
      const filtered = savedMovies.filter((m) =>
        m.title?.toLowerCase().includes(searchFormValue.toLowerCase())
      );
      const result = checked ? filtered.filter((m) => m.duration < 40) : filtered;
      if (result.length === 0) { setArrSavedMovies(false); setSavedMoviesFilter([]); }
      else { setSavedMoviesFilter(result); setArrSavedMovies(true); }
      setTimeout(() => setIsLoading(false), 500);
    } catch { setErrorTextSavedMovies(true); }
  }

  function handleSaveMovies(movie) {
    mainApi.saveRutubeVideo({
      videoId: movie.id,
      title: movie.title,
      thumbnail: movie.thumbnail,
      authorName: movie.authorName ?? '',
      duration: movie.duration,
    }).then((data) => setSavedMovies((prev) => [data, ...prev])).catch(console.error);
  }

  function handleDeleteMovies(movie) {
    const entry = savedMovies.find((s) => s._id === movie._id || s.videoId === movie.id);
    if (!entry) return;
    mainApi.deleteRutubeVideo(entry._id).then(() =>
      setSavedMovies((prev) => prev.filter((m) => m._id !== entry._id))
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
