import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Home from '../pages/home';
import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import RequireAuth from './requireAuth';
import DashboardClient from '../pages/dashboardClient';
import Registration from '../pages/registration';
import EventsLists from '../pages/eventsLists';
import EventDetail from '../pages/eventDetail';
import ValidationProcess from '../pages/registration/validationProcess';
import InvalidData from '../pages/registration/invalidData';
import PaymentPage from '../pages/payments';
import ConfirmationPage from '../pages/confirmation';
import PaymentSuccess from '../pages/successPage';

// ADMIN
import RequireAdmin from './requireAdmin';
import Dashboard from '../admin/pages/dashboard';
import DataUser from '../admin/pages/users';
import DataNarasumber from '../admin/pages/talents';
import DataKegiatan from '../admin/pages/events';
import DataPendaftaran from '../admin/pages/registration';
import DataPembayaran from '../admin/pages/payments';
import ProofOfRegis from '../pages/payments/proofOfRegis';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/*" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/events" element={<EventsLists />} />
      <Route path="/detail-kegiatan-pelatihan/:id" element={<EventDetail />} />
      <Route element={<RequireAdmin />}>
        <Route path="/dashboard-admin/*" element={<Dashboard />} />
        <Route path="/data-user/*" element={<DataUser />} />
        <Route path="/data-narasumber/*" element={<DataNarasumber />} />
        <Route path="/data-kegiatan/*" element={<DataKegiatan />} />
        <Route path="/data-pendaftaran/*" element={<DataPendaftaran />} />
        <Route path="/data-pembayaran/*" element={<DataPembayaran />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/dashboard-peserta" element={<DashboardClient />} />
        <Route
          path="/pendaftaran-kegiatan-pelatihan/:id"
          element={<Registration />}
        />
        <Route path="/proses-validasi/:id" element={<ValidationProcess />} />
        <Route path="/invalid-data/:id" element={<InvalidData />} />
        <Route path="/proses-pembayaran/:id" element={<PaymentPage />} />
        <Route
          path="/konfirmasi-pembayaran/:id"
          element={<ConfirmationPage />}
        />
        <Route path="/pembayaran-berhasil" element={<PaymentSuccess />} />
        <Route path="/bukti-pendaftaran/:id" element={<ProofOfRegis />} />
      </Route>
    </>
  )
);

export default router;
