import businessCards from '../../../assets/images/business-cards.png';
import brochures from '../../../assets/images/brochures.png';
import tearDropFlag from '../../../assets/images/tear-drop-flag.png';
import signs from '../../../assets/images/signs.png';
import CategoryCard from '../Categories/CategoryCard';

const FeaturedProducts = ({ categories }) => {
  const fallbackProducts = [
    { title: 'STANDARD BUSINESS CARDS', image: businessCards },
    { title: '16PT PREMIUM BUSINESS CARD', image: businessCards },
    { title: 'BROCHURES', image: brochures },
    { title: 'TEAR DROP FLAG', image: tearDropFlag },
    { title: 'RETRACTABLE BANNER STAND (STAND)', image: brochures },
    { title: 'FEATHER FLAG', image: tearDropFlag },
    { title: 'TEAR DROP FLAG', image: tearDropFlag },
    { title: 'SANDWICH BOARD A-FRAME SIGN', image: signs },
    { title: 'STANDARD BUSINESS CARDS', image: businessCards },
    { title: 'COROPLAST SIGNS', image: signs },
    { title: '16PT PREMIUM BUSINESS CARD', image: businessCards },
    { title: 'ROLL LABELS', image: signs },
    { title: 'RETRACTABLE BANNER STAND (STAND)', image: brochures },
    { title: 'SHEET STICKERS', image: signs },
    { title: 'BROCHURES', image: brochures },
    { title: 'SANDWICH BOARD A-FRAME SIGN', image: signs },
    { title: 'FEATHER FLAG', image: tearDropFlag },
    { title: 'COROPLAST SIGNS', image: signs },
    { title: 'STANDARD BUSINESS CARDS', image: businessCards },
    { title: 'TEAR DROP FLAG', image: tearDropFlag },
  ];

  const products =
    Array.isArray(categories) && categories.length
      ? categories.map((item) => ({
          id: item._id || item.id || null,
          title: item.title || '',
          image: item.image || '',
        }))
      : fallbackProducts; // fallback items already contain title + image, id will be undefined

  return (
    <section className="bg-white px-4 py-10 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-4xl">
            <h2 className="mb-0 text-3xl font-light leading-tight text-black md:text-5xl lg:text-6xl">
              Custom Printing Made
            </h2>
            <h3 className="text-3xl font-extrabold leading-tight text-black md:text-5xl lg:text-6xl">
              Simple and Reliable
            </h3>
          </div>
          <p className="max-w-lg py-2 text-sm leading-relaxed text-gray-500 md:text-base">
            Looking for a print shop that brings your ideas to life? You&apos;re
            in the right place. We offer digital printing services tailored for
            startups, contractors, and small businesses—making your project
            seamless from design to print and delivery.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product, index) => (
            <CategoryCard
              key={index}
              id={product.id}
              title={product.title}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
