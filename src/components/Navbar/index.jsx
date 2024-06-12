import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export default function Navbar({ className }) {
  return (
    <nav>
      <ul className={className}>
        <li>
          <Link to="/#tentang" className="hover:text-slate-500">
            Tentang
          </Link>
        </li>
        <li>
          <Link to="/#blog" className="hover:text-slate-500">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/pelatihan" className="hover:text-slate-500">
            Pelatihan
          </Link>
        </li>
        <li>
          <Link to="/kontak-kami" className="hover:text-slate-500">
            Kontak Kami
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};
