import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { fetchDeleteRegister } from '../../redux/registration/actions';
import { fetchDeleteDocument } from '../../redux/uploadDocument/actions';
import { userLogged } from '../../redux/auth/actions';

export default function InvalidData() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const registrationID = location?.state?.registrationID;
  const documentID = location?.state?.documentID;

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
    }
  }, [dispatch, token]);

  if (token) {
    console.log('VALIDASI: Data Tidak Valid');
    console.log(user._id);
    console.log(user.name);
    console.log('registrationID', registrationID);
    console.log('documentID', documentID);
  }

  const handleDeleteRegis = () => {
    dispatch(fetchDeleteRegister(registrationID));
    dispatch(fetchDeleteDocument(documentID));
    navigate('/kegiatan-pelatihan');
  };

  if (!token) return <Navigate to="/signin" replace />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-stretch gap-5 bg-white shadow-md rounded-lg p-10 max-w-sm mx-auto">
        <div className="flex flex-col items-center">
          <p className="text-center text-red-500 text-xl font-semibold mb-10">
            Data anda tidak valid.
          </p>
          <svg
            className="w-16 h-16 text-red-400 mb-4 animate-spin"
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
            Mohon daftar dan upload ulang dokumen anda dengan benar!
          </p>
        </div>
        <button
          className="bg-red-400 text-white px-2 py-2 rounded mr-2"
          onClick={handleDeleteRegis}
        >
          &lt; Daftar Ulang
        </button>
      </div>
    </div>
  );
}
