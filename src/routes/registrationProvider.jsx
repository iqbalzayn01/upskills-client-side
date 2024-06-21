import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <RegistrationContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </RegistrationContext.Provider>
  );
};

RegistrationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RegistrationContext;
