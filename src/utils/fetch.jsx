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
    alert('Email atau Password salah');
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error(errorData.msg || 'Login failed');
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
    alert(responseJson.msg);
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
      message: responseJson?.msg || 'Fetch failed',
    };
  }

  return { error: false, data: responseJson.data };
}

async function getAllUsers() {
  const response = await fetchWithToken(`${BASE_URL}/users`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function updateUsers(id, userData) {
  const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteUser(id) {
  const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    alert(responseJson.msg);
    return { error: true };
  }

  return { error: false };
}

async function createTalents({ name, email, no_telp }) {
  const response = await fetchWithToken(`${BASE_URL}/create-talents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      no_telp,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllTalents() {
  const response = await fetchWithToken(`${BASE_URL}/talents`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function updateTalents(id, talentData) {
  const response = await fetchWithToken(`${BASE_URL}/talents/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(talentData),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteTalent(id) {
  const response = await fetchWithToken(`${BASE_URL}/talents/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    alert(responseJson.msg);
    return { error: true };
  }

  return { error: false };
}

async function createSchedules({ schedules, batas_daftar, talentID, eventID }) {
  const response = await fetchWithToken(`${BASE_URL}/create-schedules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      schedules,
      batas_daftar,
      talentID,
      eventID,
    }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
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

async function getOneSchedule(id) {
  const response = await fetchWithToken(`${BASE_URL}/schedules/${id}`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteSchedules(id) {
  const response = await fetchWithToken(`${BASE_URL}/schedules/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    alert(responseJson.msg);
    return { error: true };
  }

  return { error: false };
}

async function uploadDocuments(document) {
  const response = await fetchWithToken(`${BASE_URL}/upload-documents`, {
    method: 'POST',
    body: document,
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllDocuments() {
  const response = await fetchWithToken(`${BASE_URL}/documents`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getOneDocument(id) {
  const response = await fetchWithToken(`${BASE_URL}/documents/${id}`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function updateDocuments(id, dataDocument) {
  const response = await fetchWithToken(`${BASE_URL}/documents/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataDocument),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteDocument(id) {
  const response = await fetchWithToken(`${BASE_URL}/documents/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    alert(responseJson.msg);
    return { error: true };
  }

  return { error: false };
}

async function registration({ userID, documentID, eventID }) {
  const response = await fetchWithToken(`${BASE_URL}/create-registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID,
      documentID,
      eventID,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllRegistration() {
  const response = await fetchWithToken(`${BASE_URL}/registration`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getOneRegistration(id) {
  const response = await fetchWithToken(`${BASE_URL}/registration/${id}`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteRegistration(id) {
  const response = await fetchWithToken(`${BASE_URL}/registration/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    alert(responseJson.msg);
    return { error: true };
  }

  return { error: false };
}

async function createEvents({
  name,
  description,
  event_status,
  location,
  price,
  linkMeeting,
  imageID,
  kuota,
}) {
  const response = await fetchWithToken(`${BASE_URL}/create-events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      event_status,
      location,
      price,
      linkMeeting,
      imageID,
      kuota,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllEvents() {
  const response = await fetchWithToken(`${BASE_URL}/events`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function updateEvents(id, eventData) {
  const response = await fetchWithToken(`${BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteEvent(id) {
  const response = await fetchWithToken(`${BASE_URL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    alert(responseJson.msg);
    return { error: true };
  }

  return { error: false };
}

async function uploadImages(images) {
  const response = await fetchWithToken(`${BASE_URL}/images`, {
    method: 'POST',
    body: images,
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllImages() {
  const response = await fetchWithToken(`${BASE_URL}/images`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getOneImages(id) {
  const response = await fetchWithToken(`${BASE_URL}/images/${id}`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function createPayments(registrationID) {
  const response = await fetchWithToken(`${BASE_URL}/create-payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      registrationID,
    }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    alert(responseJson.msg);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllPayments() {
  const response = await fetchWithToken(`${BASE_URL}/payments`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getOnePayments(id) {
  const response = await fetchWithToken(`${BASE_URL}/payments/${id}`);
  const responseJson = await response.json();

  if (!response.ok) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export {
  login,
  signup,
  getUserLogged,
  getAllUsers,
  updateUsers,
  deleteUser,
  createTalents,
  getAllTalents,
  updateTalents,
  deleteTalent,
  createSchedules,
  getAllSchedules,
  getOneSchedule,
  deleteSchedules,
  uploadDocuments,
  getAllDocuments,
  getOneDocument,
  updateDocuments,
  deleteDocument,
  registration,
  getAllRegistration,
  getOneRegistration,
  deleteRegistration,
  createEvents,
  getAllEvents,
  updateEvents,
  deleteEvent,
  uploadImages,
  getAllImages,
  getOneImages,
  createPayments,
  getAllPayments,
  getOnePayments,
};
