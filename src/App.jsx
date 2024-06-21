import { RouterProvider } from 'react-router-dom';

import { RegistrationProvider } from './routes/registrationProvider';
import router from './routes';

export default function App() {
  return (
    <RegistrationProvider>
      <RouterProvider router={router} />
    </RegistrationProvider>
  );
}
