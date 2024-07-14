import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { signIn } from '../../redux/auth/actions';

import FormSignIn from './formSignIn';

export default function SignIn() {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setInputError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(showLoading());
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setInputError(true);
      setIsLoading(false);
      return;
    }
    try {
      await dispatch(signIn(formData));
      setIsLoading(false);
      // dispatch(hideLoading());

      if (user?.role === 'admin') {
        navigate('/dashboard-admin');
      } else {
        navigate('/dashboard-peserta');
      }
    } catch (error) {
      console.error('Error login:', error);
      setError('email or password is wrong');
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
        {error && <p className="text-red-500 text-center">{error}</p>}
        {inputError && (
          <p className="bg-red-400 text-center text-white px-5 py-2 rounded-lg">
            Email dan Password harus diisi. Silakan coba lagi.
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
