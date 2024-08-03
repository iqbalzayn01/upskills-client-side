import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../../config';

import { userLogged } from '../../redux/auth/actions';
import { fetchOneSchedule } from '../../redux/schedules/actions';
import { fetchUploadDocument } from '../../redux/uploadDocument/actions';
import { fetchCreateRegistration } from '../../redux/registration/actions';

import Header from '../../components/Header';
import CButton from '../../components/CButton';
import { formatDate } from '../../utils/formatDateTime';

export default function Registration() {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const { schedule } = useSelector((state) => state.schedules);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = config.url;

  const [file, setFile] = useState(null);

  const { eventID, scheduleID, userID } = location.state || {};

  useEffect(() => {
    if (token) {
      dispatch(userLogged());
      dispatch(fetchOneSchedule(scheduleID));
    }
  }, [token, dispatch, scheduleID]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Dokumen harus diunggah.');
      return;
    }

    // Periksa format file
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'pdf') {
      alert('Format dokumen tidak didukung.');
      return;
    }

    // Periksa ukuran file
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      alert('Ukuran file melebihi batas maksimal 20MB.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await dispatch(fetchUploadDocument(formData));
      const documentID = response._id;

      const registerData = { eventID, documentID, userID };

      if (!eventID || !documentID || !userID) {
        alert('Semua data harus diisi.');
        return;
      }

      const registerResponse = await dispatch(
        fetchCreateRegistration(registerData)
      );
      const registrationID = registerResponse._id;
      console.log('registerID', registrationID);
      setFile(null);

      navigate(`/proses-validasi/${registrationID}`, {
        state: { registrationID },
      });
      alert('Dokumen berhasil diunggah');
    } catch (error) {
      alert('Dokumen gagal diunggah');
      console.error('Upload Document Error:', error);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container-base mx-auto p-5">
          <div className="flex flex-col gap-5">
            <h2 className="font-semibold text-2xl text-center mb-5">
              Pendaftaran Kegiatan Pelatihan
            </h2>
            <div className="flex flex-col items-center justify-center gap-5 p-6 mb-5 shadow-md border border-slate-300 rounded-xl">
              {token && schedule?.eventID && (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="">
                    {schedule.eventID.imageID &&
                      schedule.eventID.imageID.fileName && (
                        <img
                          src={`${BASE_URL}${schedule.eventID.imageID.fileName}`}
                          alt={schedule.eventID.name}
                          className="w-full h-full object-cover bg-cover rounded-lg"
                        />
                      )}
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <h4 className="font-medium text-2xl">Kegiatan</h4>
                    <div className="w-full">
                      <label className="text-sm text-gray-500">
                        ID Kegiatan
                      </label>
                      <p className="w-full text-input mt-3">
                        {schedule.eventID.id_event}
                      </p>
                    </div>
                    <div className="w-full">
                      <label className="text-sm text-gray-500">
                        Nama Kegiatan
                      </label>
                      <p className="w-full text-input mt-3">
                        {schedule.eventID.name}
                      </p>
                    </div>
                    <div className="w-full">
                      <label className="text-sm text-gray-500">Deskripsi</label>
                      <p className="w-full text-input mt-3">
                        {schedule.eventID.description}
                      </p>
                    </div>
                    <div className="w-full">
                      <label className="text-sm text-gray-500">
                        Narasumber
                      </label>
                      <p className="w-full text-input mt-3">
                        {schedule.talentID.name}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-full">
                        <label className="text-sm text-gray-500">Harga</label>
                        <p className="w-full text-input mt-3">
                          {schedule.eventID.price}
                        </p>
                      </div>
                      <div className="w-full">
                        <label className="text-sm text-gray-500">Jadwal</label>
                        {schedule.schedules.map((time, subIndex) => (
                          <div key={subIndex} className="flex gap-10">
                            <p className="w-full text-input mt-3">
                              {formatDate(time.start_time)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-5 p-6 mb-5 shadow-md border border-slate-300 rounded-xl">
              <h4 className="font-medium text-2xl">Data Pendaftaran</h4>
              {token && (
                <div className="flex flex-col justify-center gap-3">
                  <div className="w-full">
                    <label className="text-sm text-gray-500">Nama</label>
                    <p className="w-full text-input mt-3">{user.name}</p>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="w-full text-input mt-3">{user.email}</p>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-500">
                      Nomor Telepon
                    </label>
                    <p className="w-full text-input mt-3">{user.no_telp}</p>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-gray-500">Role</label>
                    <p className="w-full text-input mt-3">{user.role}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="fileName"
                          className="text-sm text-gray-500"
                        >
                          Unggah Dokumen{' '}
                          <span className="text-red-500">{`(Format PDF *)`}</span>
                        </label>
                        <label className="font-semibold text-sm p-3 border border-slate-300 rounded-xl">
                          Untuk melengkapi proses pendaftaran, Anda diwajibkan
                          mengunggah beberapa dokumen penting, termasuk Kartu
                          Tanda Penduduk {'(KTP)'} atau Surat Keterangan
                          Mahasiswa yang masih berlaku. Pastikan semua dokumen
                          diunggah dalam format PDF dan memiliki kualitas yang
                          jelas agar memudahkan proses verifikasi.
                        </label>
                      </div>
                      <input
                        id="fileName"
                        name="fileName"
                        type="file"
                        className="block w-full px-3 py-2 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        accept=".pdf"
                        onChange={handleFileChange}
                        // required
                      />
                    </div>
                    <CButton
                      type="submit"
                      className="flex w-full items-center justify-center gap-3 bg-primarycolor font-semibold text-secondarycolor text-xl px-3 py-2 mt-3 rounded-lg"
                    >
                      <span>Daftar</span>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.04579 8.02421L9.04579 8.02438C9.0459 8.20537 9.11785 8.37892 9.24583 8.5069C9.37381 8.63488 9.54736 8.70683 9.72835 8.70694H9.72873C9.90972 8.70683 10.0833 8.63488 10.2112 8.5069C10.3392 8.37892 10.4112 8.20537 10.4113 8.02438L10.4113 8.02419L10.4113 1.52464L10.4113 1.52446C10.4112 1.34346 10.3392 1.16992 10.2112 1.04193C10.0833 0.913954 9.90972 0.842005 9.72873 0.841892L9.72854 0.841892L3.22899 0.841892L3.22899 0.841705L3.21841 0.842079C3.04155 0.848322 2.87402 0.922968 2.75111 1.05029C2.6282 1.17761 2.55951 1.34767 2.55951 1.52464C2.55951 1.70161 2.6282 1.87167 2.75111 1.99899C2.87402 2.12632 3.04155 2.20096 3.21841 2.20721L3.2184 2.20739L3.22897 2.20739L8.0795 2.20779L1.3017 8.98559C1.17362 9.11367 1.10166 9.28739 1.10166 9.46853C1.10166 9.64967 1.17362 9.82339 1.3017 9.95148C1.42979 10.0796 1.60351 10.1515 1.78465 10.1515C1.96579 10.1515 2.13951 10.0796 2.2676 9.95148L9.0454 3.17368L9.04579 8.02421Z"
                          fill="#002333"
                          stroke="#002333"
                          strokeWidth="0.6"
                        />
                      </svg>
                    </CButton>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
