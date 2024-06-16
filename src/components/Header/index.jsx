import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userLogged, clearToken } from '../../redux/auth/actions';
import Navbar from '../Navbar';
import CButton from '../CButton';

export default function Header() {
  const getToken = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken) {
      dispatch(userLogged());
    }
  }, [getToken, dispatch]);

  const handleSignOut = () => {
    dispatch(clearToken());
    navigate('/');
  };

  return (
    <header className="container-base p-5">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="design/logo.svg" alt="Logo UpSkills" />
        </Link>
        <Navbar className="flex items-center text-secondarycolor gap-10" />
        <div className="flex items-center justify-end gap-5">
          {getToken ? (
            <>
              <CButton
                onClick={() => navigate('/dashboard-client')}
                className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg"
              >
                {`Hi, ${user.name}`}
              </CButton>
              <CButton
                onClick={handleSignOut}
                className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg"
              >
                {'Sign Out >'}
              </CButton>
            </>
          ) : (
            <>
              <CButton
                onClick={() => {
                  navigate('/signin');
                }}
                className="flex items-center justify-center bg-white font-semibold text-secondarycolor px-3 py-2 rounded-lg"
              >
                Sign In
              </CButton>
              <CButton
                onClick={() => {
                  navigate('/signup');
                }}
                className="flex items-center justify-center bg-primarycolor font-semibold text-secondarycolor px-3 py-2 rounded-lg"
              >
                Sign Up
              </CButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
