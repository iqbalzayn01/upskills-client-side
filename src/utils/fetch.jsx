import config from '../config';

const BASE_URL = config.base_url;

async function fetchWithToken(url, options = {}) {
  const getToken = localStorage.getItem('token');

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getToken}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error(errorData.message || 'Login failed');
  }

  return { error: false, data: responseJson.data };
}

async function signup({
  name,
  email,
  password,
  confirmPassword,
  no_telp,
  role,
}) {
  const response = await fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
      no_telp,
      role,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (!response.ok) {
    if (response.status === 500 && responseJson.msg === 'jwt expired') {
      localStorage.removeItem('token');
      window.location.href = '/signin';
      return { error: true, data: null, message: 'Token expired' };
    }
    return {
      error: true,
      data: null,
      message: responseJson.msg || 'Fetch failed',
    };
  }

  return { error: false, data: responseJson.data };
}

async function getAllSchedules() {
  const response = await fetchWithToken(`${BASE_URL}/schedules`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function uploadDocument(document) {
  const formData = new FormData();
  formData.append('document', document);

  const response = await fetchWithToken(`${BASE_URL}/upload-documents`, {
    method: 'POST',
    body: formData,
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export { login, signup, getUserLogged, getAllSchedules, uploadDocument };
