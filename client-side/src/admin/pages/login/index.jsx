import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';

import { login } from '../../utils/fetch';
import { setToken } from '../../redux/auth/actions';

import FormLogin from './formLogin';

export default function Login() {
  const getToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData);
      const { token } = res.data;
      dispatch(setToken(token));
      navigate('/dashboard');
    } catch (error) {
      setError('Terjadi kesalahan. Silakan coba lagi');
      console.error('Error login:', error);
    }
  };

  if (getToken) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-center mb-6">Dashboard Admin</h1>
        <h2 className="text-2xl text-center mb-6">Login</h2>
        {error && (
          <div
            className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <FormLogin
          handleSubmit={handleSubmit}
          onChange={handleChange}
          valueEmail={formData.email}
          valuePassword={formData.password}
        />
      </div>
    </div>
  );
}
