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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/kegiatan-pelatihan" element={<EventsLists />} />
      <Route path="/detail-kegiatan-pelatihan/:id" element={<EventDetail />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard-peserta" element={<DashboardClient />} />
        <Route
          path="/pendaftaran-kegiatan-pelatihan"
          element={<Registration />}
        />
        <Route path="/proses-validasi" element={<ValidationProcess />} />
      </Route>
    </>
  )
);

export default router;
