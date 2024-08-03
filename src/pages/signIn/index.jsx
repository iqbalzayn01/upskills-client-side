import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { signIn } from '../../redux/auth/actions';

import FormSignIn from './formSignIn';

export default function SignIn() {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      const timer = setTimeout(() => {
        setSuccessMessage('');
        navigate(location.pathname, { replace: true });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setInputError(false);
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(showLoading());
    setIsLoading(true);

    if (!formData.email && !formData.password) {
      setInputError(true);
      setIsLoading(false);
      return;
    }

    if (formData.email && !formData.password) {
      setPasswordError(true);
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(signIn(formData));
      setIsLoading(false);
      // dispatch(hideLoading());

      if (user) {
        if (user.role === 'peserta') {
          navigate('/dashboard-peserta');
        } else {
          navigate('/dashboard-admin');
        }
      }
    } catch (error) {
      console.error('Error login:', error);
      setError('Email atau password salah');
      setIsLoading(false);
      // dispatch(hideLoading());
    }
  };

  if (token && user) {
    return null; // Sementara tunggu useEffect mengarahkan
  }

  return (
    <section className="">
      <div className="container-base w-full h-screen flex flex-col place-content-center gap-5 px-10 py-10">
        <h3 className="font-semibold text-2xl text-secondarycolor text-center">
          Sign In
        </h3>
        {successMessage && (
          <p className="bg-green-400 text-center text-white px-5 py-2 rounded-lg">
            {successMessage}
          </p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {inputError && (
          <p className="bg-red-400 text-center text-white px-5 py-2 rounded-lg">
            Email dan Password harus diisi. Silakan coba lagi.
          </p>
        )}
        {passwordError && (
          <p className="bg-red-400 text-center text-white px-5 py-2 rounded-lg">
            Password wajib diisi
          </p>
        )}
        <FormSignIn
          valueEmail={formData.email}
          valuePassword={formData.password}
          handleSubmit={handleSubmit}
          onChange={handleChange}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
