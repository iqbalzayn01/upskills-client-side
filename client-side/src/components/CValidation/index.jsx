import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { fetchOneRegistration } from '../../redux/registration/actions';
import { userLogged } from '../../redux/auth/actions';

export default function CValidation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, user } = useSelector((state) => state.auth);
  const { register } = useSelector((state) => state.registration);

  const registrationID = location.state?.registrationID || id;

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
      if (registrationID) {
        dispatch(fetchOneRegistration(registrationID));
      }
    }
  }, [registrationID, dispatch, token]);

  useEffect(() => {
    if (register && user) {
      if (register.userID && register.userID._id === user._id) {
        const { data_valid } = register.documentID;

        if (data_valid === 'Data Tidak Valid') {
          console.log('VALIDASI:', data_valid);
          navigate(`/invalid-data/${user._id}`, {
            state: {
              registrationID: register._id,
              documentID: register.documentID._id,
            },
          });
        } else if (data_valid === 'Data Valid') {
          console.log('VALIDASI:', data_valid);
          navigate(`/proses-pembayaran/${register._id}`, {
            state: { registrationID: register._id },
          });
        } else {
          console.log('VALIDASI:', data_valid);
          if (registrationID === register._id) {
            navigate(`/proses-validasi/${registrationID}`);
          }
        }
      }
    }
  }, [registrationID, register, user, navigate]);

  const handleReloadPage = () => {
    window.location.reload();
  };

  const handleToDashboard = () => {
    navigate('/dashboard-peserta');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-stretch gap-5 bg-white shadow-md rounded-lg p-10 max-w-sm mx-auto">
        <div className="flex flex-col items-center">
          <svg
            className="w-16 h-16 text-blue-500 mb-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v1m0 14v1m8-8h-1M4 12H3m15.364 7.364l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707m-12.02-12.02l-.707-.707"
            />
          </svg>
          <p className="text-center text-gray-700 text-xl font-semibold">
            Sedang proses validasi data, mohon tunggu 1 x 24 jam.
          </p>
        </div>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
          onClick={handleReloadPage}
        >
          Muat Ulang Halaman
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
          onClick={handleToDashboard}
        >
          &lt; Dashboard
        </button>
      </div>
    </div>
  );
}
