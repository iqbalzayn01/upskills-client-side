import { useEffect } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { userLogged } from '../../redux/auth/actions';
import { fetchOnePay } from '../../redux/payments/actions';
import { fetchAllSchedules } from '../../redux/schedules/actions';
import ProofOfRegisPDF from './proofOfRegisPDF';
import formatDateTime from '../../utils/formatDateTime';

export default function ProofOfRegis() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { pay } = useSelector((state) => state.payments);
  const { schedules } = useSelector((state) => state.schedules);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
      if (id) {
        dispatch(fetchOnePay(id));
        dispatch(fetchAllSchedules());
      }
    }
  }, [id, dispatch, token]);

  const schedule = schedules.find(
    (sched) => sched?.eventID?._id === pay?.registrationID?.eventID?._id
  );

  if (!pay || !schedule) {
    return <div>Loading...</div>;
  }

  if (!token) return <Navigate to="/signin" replace />;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-5">
        <Link to={`/dashboard-peserta`} className="text-gray-600">
          &lt; Kembali
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg p-12">
        <div className="flex flex-col items-center gap-6">
          <div>
            <img src="/design/logo.svg" alt="Logo" className="w-24" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Bukti Pendaftaran</h2>
          </div>
        </div>
        <div className="border-t border-gray-500 mt-8 pt-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-600">ID Peserta</p>
              <p className="font-bold">
                {pay?.registrationID?.userID?.id_user}
              </p>
              <p className="text-gray-600 mt-2">Nama Peserta</p>
              <p className="font-bold">{pay?.registrationID?.userID?.name}</p>
              <p className="text-gray-600 mt-2">Email</p>
              <p className="font-bold">{pay?.registrationID?.userID?.email}</p>
              <p className="text-gray-600 mt-2">Nomor Telepon</p>
              <p className="font-bold">
                {pay?.registrationID?.userID?.no_telp}
              </p>
            </div>
            <div className="mr-40">
              <p className="text-gray-600">ID Kegiatan</p>
              <p className="font-bold">
                {pay?.registrationID?.eventID?.id_event}
              </p>
              <p className="text-gray-600 mt-2">Pelatihan</p>
              <p className="font-bold">{schedule?.eventID?.name}</p>
              <p className="text-gray-600 mt-2">Jadwal</p>
              {schedule.schedules.map((time, idnex) => (
                <div key={idnex}>
                  <p className="font-bold">{formatDateTime(time.start_time)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right mt-5 pt-4">
          <p className="">
            ID Pembayaran: <span className="font-bold">{pay.id_payment}</span>
          </p>
        </div>
        <div className="mt-6 text-center">
          <PDFDownloadLink
            document={<ProofOfRegisPDF pay={pay} schedule={schedule} />}
            fileName="bukti_pendaftaran.pdf"
            className="bg-primarycolor font-medium px-4 py-2 rounded"
          >
            {({ loading }) =>
              loading ? 'Generating PDF...' : 'Unduh Bukti Pendaftaran'
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
