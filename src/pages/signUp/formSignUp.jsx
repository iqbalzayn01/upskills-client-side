import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CButton from '../../components/CButton';
import CInputLabel from '../../components/CInputLabel';

export default function FormSignUp({
  isLoading,
  handleSubmit,
  valueName,
  valueEmail,
  valueNoTelp,
  valuePassword,
  valueConfirmPassword,
  onChange,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center justify-center gap-5"
    >
      <CInputLabel
        htmlFor="name"
        label="Nama"
        name="name"
        type="text"
        value={valueName}
        className="w-full text-input mt-3"
        classNameLabel="font-medium text-secondarycolor"
        placeholder="Name"
        onChange={onChange}
      />
      <CInputLabel
        htmlFor="email-address"
        label="Email"
        name="email"
        type="email"
        value={valueEmail}
        className="w-full text-input mt-3"
        classNameLabel="font-medium text-secondarycolor"
        placeholder="Email"
        onChange={onChange}
      />
      <CInputLabel
        htmlFor="no-telp"
        label="Nomor Telepon"
        name="no_telp"
        type="text"
        value={valueNoTelp}
        className="w-full text-input mt-3"
        classNameLabel="font-medium text-secondarycolor"
        placeholder="Nomor Telepon"
        onChange={onChange}
      />
      <CInputLabel
        htmlFor="password"
        label="Password"
        name="password"
        type="password"
        value={valuePassword}
        className="w-full text-input mt-3"
        classNameLabel="font-medium text-secondarycolor"
        placeholder="Password"
        onChange={onChange}
      />
      <CInputLabel
        htmlFor="confirmPassword"
        label="Konfirmasi Password"
        name="confirmPassword"
        type="password"
        value={valueConfirmPassword}
        className="w-full text-input mt-3"
        classNameLabel="font-medium text-secondarycolor"
        placeholder="Konfirmasi Password"
        onChange={onChange}
      />
      <CButton
        type="submit"
        className="bg-zinc-800 hover:bg-black px-5 py-2 text-center text-white rounded-lg"
        loading={isLoading}
        disabled={isLoading}
      >
        Daftar Akun Baru
      </CButton>
      <p className="text-secondarycolor">
        Sudah punya akun?
        <Link to="/signin" className="underline">
          Sign In disini
        </Link>
      </p>
      <Link to="/" className="hover:underline">
        {'< Kembali'}
      </Link>
    </form>
  );
}

FormSignUp.propTypes = {
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  valueName: PropTypes.string,
  valueEmail: PropTypes.string,
  valueNoTelp: PropTypes.string,
  valuePassword: PropTypes.string,
  valueConfirmPassword: PropTypes.string,
  onChange: PropTypes.func,
};
