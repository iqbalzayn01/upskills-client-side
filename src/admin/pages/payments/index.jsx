import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { userLogged } from '../../../redux/auth/actions';
import { fetchAllPay } from '../../../redux/payments/actions';
import formatDateTime from '../../../utils/formatDateTime';
import Sidebar from '../../components/Sidebar';

export default function DataPembayaran() {
  const { payments } = useSelector((state) => state.payments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogged());
    dispatch(fetchAllPay());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Sidebar />
      <main className="ml-64 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl">Data Pembayaran</h1>
        </div>
        <hr className="border border-gray-300 mb-10" />
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">No</th>
                <th className="text-left px-4 py-2">ID Pembayaran</th>
                <th className="text-left px-4 py-2">Nama Peserta</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Pelatihan</th>
                <th className="text-left px-4 py-2">Total Pembayaran</th>
                <th className="text-left px-4 py-2">Tgl Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              {payments && payments?.length > 0 ? (
                payments.map((pay, index) => (
                  <tr key={pay?._id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{pay?.id_payment}</td>
                    <td className="px-4 py-2">
                      {pay?.registrationID?.userID?.name}
                    </td>
                    <td className="px-4 py-2">
                      {pay?.registrationID?.userID?.email}
                    </td>
                    <td className="px-4 py-2">
                      {pay?.registrationID?.eventID?.name}
                    </td>
                    <td className="px-4 py-2">{pay?.total_payment}</td>
                    <td className="px-4 py-2">
                      {formatDateTime(pay?.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center px-4 py-2 text-gray-500"
                  >
                    Belum ada data pembayaran
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
