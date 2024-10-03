import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CSearch from '../CSearch';

const links = [
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Events',
    url: '/events',
  },
  {
    name: 'Blog',
    url: '/blog',
  },
];

export default function Navbar({ className }) {
  return (
    <nav>
      <ul className={className}>
        {links.map((link) => (
          <li key={link.name} className="text-white hover:text-primarycolor">
            <Link to={link.url}>{link.name}</Link>
          </li>
        ))}
        <CSearch />
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};
