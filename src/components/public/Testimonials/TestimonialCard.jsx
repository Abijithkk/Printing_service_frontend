import { Star } from 'lucide-react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { scaleInVariants, hoverScaleVariants } from '../../../utils/animations';

const TestimonialCard = ({ name, rating, text, duration }) => {
  return (
    <motion.div
      className="flex flex-col border border-white/5 bg-[#0b0b0b] p-5 transition-all duration-300 hover:border-[#8ED800]/30 hover:bg-[#0f0f0f]"
      variants={scaleInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3 },
      }}
    >
      <motion.h3
        className="mb-2 text-sm font-semibold text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {name}
      </motion.h3>

      <motion.div
        className="mb-3 flex gap-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', damping: 10 }}
          >
            <Star
              size={14}
              className={`${
                i < rating ? 'fill-[#ffb800] text-[#ffb800]' : 'text-zinc-800'
              }`}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="mb-4 text-[13px] leading-relaxed text-[#a1a1a1]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {text}
      </motion.p>

      {duration ? (
        <motion.span
          className="text-xs font-medium text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {duration}
        </motion.span>
      ) : null}
    </motion.div>
  );
};

TestimonialCard.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  duration: PropTypes.string,
};

export default TestimonialCard;
