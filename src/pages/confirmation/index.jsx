import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { userLogged } from '../../redux/auth/actions';
import { fetchOnePay } from '../../redux/payments/actions';
import formatPrice from '../../utils/formatPrice';

export default function ConfirmationPage() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { pay } = useSelector((state) => state.payments);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const paymentID = location.state?.paymentID || id;

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
      if (paymentID) {
        dispatch(fetchOnePay(paymentID));
      }
    }
  }, [paymentID, dispatch, token]);

  const handleConfirm = () => {
    navigate('/pembayaran-berhasil');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Konfirmasi Pembayaran</h1>
        </div>
        <div className="bg-gray-900 text-white p-6 rounded-lg">
          <p>ID Pembayaran: {pay?.id_payment}</p>
          <p>Pelatihan</p>
          <p className="text-2xl text-green-400 font-bold">
            {pay?.registrationID.eventID.name}
          </p>
          <p>Total Bayar</p>
          <p className="text-2xl">Rp. {formatPrice(pay?.total_payment)}</p>
          <button
            onClick={handleConfirm}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}
