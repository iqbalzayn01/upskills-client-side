import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { signUp } from '../../redux/users/actions';
import FormSignUp from './formSignUp';

export default function SignUp() {
  const getToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false); // State untuk error panjang password
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [allFieldsError, setAllFieldsError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    no_telp: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setAllFieldsError(false);
    setPasswordError(false);
    setPasswordLengthError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(showLoading());
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.no_telp) {
      setAllFieldsError(true);
      setIsLoading(false);
      return;
    }

    if (!formData.password) {
      setPasswordError(true);
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setPasswordLengthError(true);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      setIsLoading(false);
      return;
    }

    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailFormatError(true);
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(signUp(formData));
      setIsLoading(false);
      navigate('/signin', {
        state: { successMessage: 'Akun berhasil dibuat' },
      });
      // dispatch(hideLoading());
    } catch (error) {
      console.error('Sign Up Error:', error);
      setError('Sign up error');
      setIsLoading(false);
      // dispatch(hideLoading());
    }
  };

  if (getToken) return <Navigate to="/dashboard-peserta" replace />;

  return (
    <section className="">
      <div className="container-base w-full h-screen flex flex-col place-content-center gap-5 px-10 py-10">
        <h3 className="font-semibold text-2xl text-black text-center">
          Sign Up
        </h3>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {allFieldsError && (
          <p className="bg-red-400 text-center text-white px-5 py-2 rounded-lg">
            Semua kolom input harus diisi. Mohon input dengan benar!
          </p>
        )}
        {passwordMatchError && (
          <p className="bg-red-400 text-center text-white px-5 py-2 rounded-lg">
            Passwords tidak cocok. Silakan coba lagi.
          </p>
        )}
        {passwordError && (
          <p className="bg-red-400 text-center text-white px-5 py-2 rounded-lg">
            Password wajib diisi.
          </p>
        )}
        {passwordLengthError && (
          <p className="bg-red-400 text-center text-white px-5 py-2 rounded-lg">
            Password harus minimal 6 karakter.
          </p>
        )}
        {emailFormatError && (
          <p className="bg-red-400 text-center text-white px-5 py-2 rounded-lg">
            Format email tidak valid.
          </p>
        )}
        <FormSignUp
          valueName={formData.name}
          valueEmail={formData.email}
          valueNoTelp={formData.no_telp}
          valuePassword={formData.password}
          valueConfirmPassword={formData.confirmPassword}
          handleSubmit={handleSubmit}
          onChange={handleChange}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
