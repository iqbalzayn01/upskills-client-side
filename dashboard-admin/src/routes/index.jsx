import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Login from '../pages/login';
import RequireAuth from './requireAuth';
import Dashboard from '../pages/dashboard';
import DataUser from '../pages/users';
import DataNarasumber from '../pages/talents';
import DataKegiatan from '../pages/events';
// import NotFound from '../pages/notFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/data-user/*" element={<DataUser />} />
        <Route path="/data-narasumber/*" element={<DataNarasumber />} />
        <Route path="/data-kegiatan/*" element={<DataKegiatan />} />
        {/* <Route path="/*" element={<NotFound />} /> */}
      </Route>
    </>
  )
);

export default router;
