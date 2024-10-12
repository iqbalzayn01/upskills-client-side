import { Link } from 'react-router-dom';

export default function SocialMedia() {
  return (
    <ul className="flex gap-10">
      <Link
        to="https://www.facebook.com/"
        target="_blank"
        className="hover:text-gray-400"
      >
        <img src="/design/facebook.svg" alt="Social Media" />
      </Link>
      <Link to="https://x.com/" target="_blank" className="hover:text-gray-400">
        <img src="/design/twitter.svg" alt="Social Media" />
      </Link>
      <Link
        to="https://www.linkedin.com/"
        target="_blank"
        className="hover:text-gray-400"
      >
        <img src="/design/linkedin.svg" alt="Social Media" />
      </Link>
      <Link
        to="https://www.instagram.com/"
        target="_blank"
        className="hover:text-gray-400"
      >
        <img src="/design/instagram.svg" alt="Social Media" />
      </Link>
    </ul>
  );
}
