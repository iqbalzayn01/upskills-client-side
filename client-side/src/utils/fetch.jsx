import axios from 'axios';
import config from '../config';

const BASE_URL = config.base_url;

async function fetchWithToken(url, options = {}) {
  const authData = localStorage.getItem('auth');
  let token = null;
  if (authData) {
    const parsedAuthData = JSON.parse(authData);
    token = parsedAuthData.token;
  }

  try {
    return await axios(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    localStorage.removeItem('auth');
    console.error('Fetch error', error);
    throw error;
  }
}

async function login({ email, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error response:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}

async function signup({
  name,
  email,
  password,
  confirmPassword,
  no_telp,
  role,
}) {
  try {
    const response = await axios.post(`${BASE_URL}/sign-up`, {
      name,
      email,
      password,
      confirmPassword,
      no_telp,
      role,
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.message || 'An error occurred during signup');
    return { error: true, data: null };
  }
}

async function getUserLogged() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    return { error: false, data: response.data.data };
  } catch (error) {
    if (
      error.response &&
      error.response.status === 500 &&
      error.response.data.msg === 'jwt expired'
    ) {
      localStorage.removeItem('auth');
      window.location.href = '/signin';
      return { error: true, data: null, message: 'Token expired' };
    }
    return {
      error: true,
      data: null,
      message: error.response?.data?.msg || 'Fetch failed',
    };
  }
}

async function getAllUsers() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.log('Error fetching users:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
}

async function updateUsers(id, userData) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: userData,
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to update user');
    console.error('Error updating user:', error);
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
}

async function deleteUser(id) {
  try {
    await fetchWithToken(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });

    return { error: false };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to delete user');
    console.error('Error deleting user:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
}

async function createTalents({ name, email, no_telp }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/create-talents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        no_telp,
      },
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to create talent');
    console.error('Error creating talent:', error);
    throw new Error(error.response?.data?.message || 'Failed to create talent');
  }
}

async function getAllTalents() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/talents`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching talents:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch talents');
  }
}

async function updateTalents(id, talentData) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/talents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: talentData,
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to update talent');
    console.error('Error updating talent:', error);
    throw new Error(error.response?.data?.message || 'Failed to update talent');
  }
}

async function deleteTalent(id) {
  try {
    await fetchWithToken(`${BASE_URL}/talents/${id}`, {
      method: 'DELETE',
    });

    return { error: false };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to delete talent');
    console.error('Error deleting talent:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete talent');
  }
}

async function createSchedules({ schedules, batas_daftar, talentID, eventID }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/create-schedules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        schedules,
        batas_daftar,
        talentID,
        eventID,
      },
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to create schedule');
    console.error('Error creating schedule:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to create schedule'
    );
  }
}

async function getAllSchedules() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/schedules`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching schedules:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch schedules'
    );
  }
}

async function getOneSchedule(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/schedules/${id}`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch schedule'
    );
  }
}

async function deleteSchedules(id) {
  try {
    await fetchWithToken(`${BASE_URL}/schedules/${id}`, {
      method: 'DELETE',
    });

    return { error: false };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to delete schedule');
    console.error('Error deleting schedule:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to delete schedule'
    );
  }
}

async function uploadDocuments(document) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/upload-documents`, {
      method: 'POST',
      data: document instanceof FormData ? document : new FormData(document),
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to upload document');
    console.error('Error uploading document:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to upload document'
    );
  }
}

async function getAllDocuments() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/documents`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch documents'
    );
  }
}

async function getOneDocument(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/documents/${id}`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching document:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch document'
    );
  }
}

async function updateDocuments(id, dataDocument) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/documents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataDocument,
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to update document');
    console.error('Error updating document:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to update document'
    );
  }
}

async function deleteDocument(id) {
  try {
    await fetchWithToken(`${BASE_URL}/documents/${id}`, {
      method: 'DELETE',
    });

    return { error: false };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to delete document');
    console.error('Error deleting document:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to delete document'
    );
  }
}

async function registration({ userID, documentID, eventID }) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/create-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userID,
        documentID,
        eventID,
      },
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to create registration');
    console.error('Error creating registration:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to create registration'
    );
  }
}

async function getAllRegistration() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/registration`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch registrations'
    );
  }
}

async function getOneRegistration(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/registration/${id}`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching registration:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch registration'
    );
  }
}

async function deleteRegistration(id) {
  try {
    await fetchWithToken(`${BASE_URL}/registration/${id}`, {
      method: 'DELETE',
    });

    return { error: false };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to delete registration');
    console.error('Error deleting registration:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to delete registration'
    );
  }
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
  try {
    const response = await fetchWithToken(`${BASE_URL}/create-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        description,
        event_status,
        location,
        price,
        linkMeeting,
        imageID,
        kuota,
      },
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to create event');
    console.error('Error creating event:', error);
    throw new Error(error.response?.data?.message || 'Failed to create event');
  }
}

async function getAllEvents() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/events`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch events');
  }
}

async function updateEvents(id, eventData) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: eventData,
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to update event');
    console.error('Error updating event:', error);
    throw new Error(error.response?.data?.message || 'Failed to update event');
  }
}

async function deleteEvent(id) {
  try {
    await fetchWithToken(`${BASE_URL}/events/${id}`, {
      method: 'DELETE',
    });

    return { error: false };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to delete event');
    console.error('Error deleting event:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete event');
  }
}

async function uploadImages(images) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/images`, {
      method: 'POST',
      data: images instanceof FormData ? images : new FormData(images),
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to upload images');
    console.error('Error uploading images:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload images');
  }
}

async function getAllImages() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/images`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch images');
  }
}

async function getOneImages(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/images/${id}`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching image:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch image');
  }
}

async function deleteImages(id) {
  try {
    await fetchWithToken(`${BASE_URL}/images/${id}`, {
      method: 'DELETE',
    });

    return { error: false };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to delete images');
    console.error('Error deleting images:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete images');
  }
}

async function createPayments(registrationID) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/create-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        registrationID,
      },
    });

    return { error: false, data: response.data.data };
  } catch (error) {
    alert(error.response?.data?.msg || 'Failed to create payment');
    console.error('Error creating payment:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to create payment'
    );
  }
}

async function getAllPayments() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/payments`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch payments'
    );
  }
}

async function getOnePayments(id) {
  try {
    const response = await fetchWithToken(`${BASE_URL}/payments/${id}`);
    return { error: false, data: response.data.data };
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch payment');
  }
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
  deleteImages,
  createPayments,
  getAllPayments,
  getOnePayments,
};
