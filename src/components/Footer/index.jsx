import { Link } from 'react-router-dom';

import SocialMedia from './socialMedia';

export default function Footer() {
  return (
    <footer className="container-base grid gap-10 px-5 py-5">
      <div className="grid md:grid-cols-2 items-end gap-10">
        <div className="flex gap-10">
          <ul className="flex flex-col gap-5">
            <li className="font-semibold text-base">Perusahaan</li>
            <Link to="/about" className="hover:text-gray-400">
              Tentang
            </Link>
            <Link to="/events" className="hover:text-gray-400">
              Pelatihan
            </Link>
            <Link to="/blog" className="hover:text-gray-400">
              Blog
            </Link>
            <Link to="/about" className="hover:text-gray-400">
              Partner
            </Link>
            <Link to="/about" className="hover:text-gray-400">
              Karir
            </Link>
          </ul>
          <ul className="flex flex-col gap-5">
            <li className="font-semibold text-base">Support</li>
            <Link to="/contact-us" className="hover:text-gray-400">
              Kontak Kami
            </Link>
            <Link to="/faq" className="hover:text-gray-400">
              FAQ
            </Link>
          </ul>
        </div>
        <div className="grid gap-5 md:justify-end">
          <span className="font-semibold text-base">Social Media</span>
          <SocialMedia />
        </div>
      </div>
      <hr className="border border-gray-300" />
      <div className="text-center">
        <span className="font-semibold text-base">
          Copyright © 2024 Iqbal Zayyan All Right Reserved
        </span>
      </div>
    </footer>
  );
}
