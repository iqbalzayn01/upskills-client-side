/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';

export default function CButton({
  onClick,
  type,
  className,
  children,
  loading,
  disabled,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {loading ? 'Loading . . .' : children}
    </button>
  );
}

CButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
