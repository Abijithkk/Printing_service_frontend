import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { hoverScaleVariants } from '../../../utils/animations';

const HighlightCard = ({ icon: Icon, title }) => {
  return (
    <motion.div
      className="group flex w-full flex-1 cursor-default items-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#8ED800]/50 sm:p-5 lg:min-w-[200px] lg:rounded-none lg:bg-black/40 lg:p-6 lg:hover:border-[#8ED800]/50"
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { borderColor: 'rgba(255, 255, 255, 0.1)' },
        hover: {
          borderColor: 'rgba(142, 216, 0, 0.5)',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          transition: { duration: 0.3 },
        },
      }}
    >
      <div className="flex items-center space-x-3 sm:space-x-4">
        <motion.div
          className="flex-shrink-0 text-[#8ED800] transition-transform duration-300 group-hover:scale-110"
          variants={hoverScaleVariants}
          initial="initial"
          whileHover="hover"
        >
          <Icon
            size={24}
            strokeWidth={1.5}
            className="h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6"
          />
        </motion.div>
        <h3 className="text-sm font-medium tracking-wide text-gray-200 sm:text-[13px] sm:text-white lg:text-white">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

HighlightCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
};

export default HighlightCard;
