import PropTypes from 'prop-types';

export default function FormLogin({
  handleSubmit,
  onChange,
  valueEmail,
  valuePassword,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={valueEmail}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={valuePassword}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </form>
  );
}

FormLogin.propTypes = {
  handleSubmit: PropTypes.func,
  onChange: PropTypes.func,
  valueEmail: PropTypes.string,
  valuePassword: PropTypes.string,
};
