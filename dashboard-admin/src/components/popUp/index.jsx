import PropTypes from 'prop-types';

export default function PopUp({
  handle,
  onClose,
  textPopUp,
  classNameBtn,
  textBtn,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl text-black mb-4">{textPopUp}</h2>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handle}
            className={`text-white px-4 py-2 rounded ${classNameBtn}`}
          >
            {textBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

PopUp.propTypes = {
  handle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  textPopUp: PropTypes.string,
  classNameBtn: PropTypes.string,
  textBtn: PropTypes.string,
};
