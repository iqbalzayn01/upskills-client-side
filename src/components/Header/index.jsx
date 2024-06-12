// import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// import { userLogged, clearToken } from '../../redux/auth/actions';
import Navbar from '../Navbar';
import CButton from '../CButton';

export default function Header() {
  //   const [fetchDone, setFetchDone] = useState(false);
  //   const getToken = useSelector((state) => state.auth.token);
  //   const getUser = useSelector((state) => state.auth.user);
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //   useEffect(() => {
  //     if (getUser && getToken && !fetchDone) {
  //       //  dispatch(fetchUser());
  //       console.log('LOGIN');
  //       setFetchDone(true);
  //     }
  //   }, [getUser, getToken, fetchDone, dispatch]);

  const shouldDisplayNavbar = () => location.pathname === '/';

  //   const handleSignOut = () => {
  //       dispatch(clearToken());
  //     console.log('SIGN OUT');
  //     navigate('/');
  //   };

  return (
    <header className="container-base py-5">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="design/logo.svg" alt="Logo UpSkills" />
        </Link>
        {shouldDisplayNavbar() && (
          <Navbar className="flex items-center text-secondarycolor gap-10" />
        )}
        <div className="flex items-center justify-end gap-5">
          {/* {getToken ? (
            <>
              <p className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg">
                {`Hi, ${getUser.name}`}
              </p>
              <CButton
                onClick={handleSignOut}
                className="flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg"
              >
                {'Sign Out >'}
              </CButton>
            </>
          ) : (
            <> */}
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
          {/* </>
          )} */}
        </div>
      </div>
    </header>
  );
}
