import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { userLogged } from '../../../redux/auth/actions';
import { fetchAllPay } from '../../../redux/payments/actions';
import Sidebar from '../../components/Sidebar';

export default function DataPembayaran() {
  const { payments } = useSelector((state) => state.payments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogged());
    dispatch(fetchAllPay());
  }, [dispatch]);

  console.log('TESTING', payments);

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
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Nomor Telepon</th>
                <th className="text-left px-4 py-2">Role</th>
                <th className="text-left px-4 py-2">Dokumen</th>
                <th className="text-left px-4 py-2">Status</th>
              </tr>
            </thead>
            {/* <tbody>
              {payments && payments.length > 0 ? (
                payments.map((pay, index) => (
                  <tr key={pay._id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{register.userID.name}</td>
                    <td className="px-4 py-2">{register.userID.email}</td>
                    <td className="px-4 py-2">{register.userID.no_telp}</td>
                    <td className="px-4 py-2">{register.userID.role}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`http://localhost:9000/${register.documentID.fileName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Lihat Dokumen
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      {register.documentID.data_valid}
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
            </tbody> */}
          </table>
        </div>
      </main>
    </div>
  );
}
