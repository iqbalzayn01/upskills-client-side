import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { signIn } from '../../redux/auth/actions';
import FormSignIn from './formSignIn';

export default function SignIn() {
  const getToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(showLoading());
    setIsLoading(true);
    try {
      await dispatch(signIn(formData));
      setIsLoading(false);
      // dispatch(hideLoading());
      navigate('/dashboard-client');
    } catch (error) {
      console.error('Error login:', error);
      setError('email or password is wrong');
      setIsLoading(false);
      // dispatch(hideLoading());
    }
  };

  if (getToken) return <Navigate to="/dashboard-client" replace />;

  return (
    <section className="">
      <div className="container-base w-full h-screen flex flex-col place-content-center gap-5 px-10 py-10">
        <h3 className="font-semibold text-2xl text-secondarycolor text-center">
          Sign In
        </h3>
        {error && <p className="text-red-500 text-center">{error}</p>}
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
