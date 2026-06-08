export const register = async (name, email, password) => {
  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (res.status === 201 || res.status === 200) return res.json();
  if (res.status === 409) return Promise.reject('Пользователь с таким email уже существует');
  return Promise.reject('При регистрации произошла ошибка');
};

export const authorize = async (email, password) => {
  const res = await fetch('/api/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) return Promise.reject('Вы ввели неправильный логин или пароль');
  const data = await res.json();
  localStorage.setItem('jwt', data._id);
  return data._id;
};

export const checkValidityToken = async (jwt) => {
  const res = await fetch('/api/users/me', {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  if (res.ok) return res.json();
  return null;
};
