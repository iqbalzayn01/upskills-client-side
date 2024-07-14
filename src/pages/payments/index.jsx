import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { userLogged } from '../../redux/auth/actions';
import { fetchOneRegistration } from '../../redux/registration/actions';
import { fetchCreatePay } from '../../redux/payments/actions';
import formatPrice from '../../utils/formatPrice';

export default function PaymentPage() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { register } = useSelector((state) => state.registration);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const registrationID = location.state?.registrationID || id;
  const [selectedBank, setSelectedBank] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
      if (registrationID) {
        dispatch(fetchOneRegistration(registrationID));
      }
    }
  }, [registrationID, dispatch, token]);

  const handlePayment = async (e) => {
    e.preventDefault();

    const responsePay = await dispatch(fetchCreatePay(registrationID));

    if (responsePay && responsePay?._id) {
      const paymentID = responsePay?._id;
      navigate(`/konfirmasi-pembayaran/${paymentID}`, {
        state: { paymentID },
      });
    }
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">
            Pembayaran Kegiatan Pelatihan
          </h1>
          <p>Berikut rincian pembayaran</p>
        </div>
        {register ? (
          <div className="bg-gray-900 text-white p-6 rounded-lg flex flex-col">
            <div className="grid grid-cols-2 items-start justify-between">
              <div className="rincian col-span-1">
                <p>ID Pendaftaran: {register.id_regis}</p>
                <p>Pelatihan</p>
                <p className="text-2xl text-green-400 font-bold">
                  {register.eventID.name}
                </p>
                <p>Total Bayar</p>
                <p className="text-2xl">
                  Rp. {formatPrice(register.eventID.price)}
                </p>
              </div>
              <div className="col-span-1 flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-2">
                  {['BRI', 'BCA', 'Mandiri', 'BNI', 'BTPN', 'Niaga'].map(
                    (bank) => (
                      <button
                        key={bank}
                        onClick={() => handleBankSelect(bank)}
                        className={`${
                          selectedBank === bank
                            ? 'bg-primarycolor text-black'
                            : 'bg-transparent text-white  border-2 border-white'
                        } hover:bg-primarycolor hover:text-black text-sm font-bold py-2 px-4 rounded`}
                      >
                        Bank {bank}
                      </button>
                    )
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handlePayment}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Pembayaran
                  </button>
                  <button
                    onClick={() => navigate('/dashboard-peserta')}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
