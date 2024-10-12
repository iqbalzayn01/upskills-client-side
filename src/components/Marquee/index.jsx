import PropTypes from 'prop-types';

import ScrollVelocity from '../ScrollVelocity';

export default function MarqueeMessage({ caption }) {
  return (
    <div className="bg-primarycolor py-5">
      <ScrollVelocity baseVelocity={2}>
        <p className="font-medium">{caption}</p>
        <span className="bg-black px-[218px] py-[2px]"></span>
      </ScrollVelocity>
    </div>
  );
}

MarqueeMessage.propTypes = {
  caption: PropTypes.string.isRequired,
};
