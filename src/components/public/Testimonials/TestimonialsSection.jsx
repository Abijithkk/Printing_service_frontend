import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import {
  staggerContainerVariants,
  slideUpVariants,
  getViewportConfig,
} from '../../../utils/animations';
const TestimonialsSection = ({ testimonials }) => {
  const resolvedTestimonials = Array.isArray(testimonials)
    ? testimonials.map((item) => ({
        name: item.name,
        rating: item.rating,
        text: item.content,
        duration: '',
      }))
    : [];

  if (!resolvedTestimonials.length) {
    return null;
  }

  return (
    <section className="bg-black px-4 py-10 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          className="mb-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={getViewportConfig()}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl font-bold text-white md:text-4xl"
            variants={slideUpVariants}
          >
            What Our Customers Say
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={getViewportConfig()}
          variants={staggerContainerVariants}
        >
          {resolvedTestimonials.map((testimonial, index) => (
            <div key={index}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
