import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CategoryCard = ({ title, image, id }) => {
  const href = id ? `/category/${id}` : '#';

  return (
    <Link to={href} className="group block">
      <div className="mb-5 aspect-[11/12] overflow-hidden bg-[#F5F5F5] transition-all duration-500 group-hover:shadow-xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
        />
      </div>
      <h4 className="font-inter text-xs font-bold uppercase leading-snug tracking-widest text-black md:text-sm">
        {title}
      </h4>
    </Link>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  id: PropTypes.string,
};

CategoryCard.defaultProps = {
  image: '',
  id: null,
};

export default CategoryCard;
