import { useEffect, useRef } from 'react';
import HeroSection from '../../components/public/Hero/HeroSection';
import FeaturedProducts from '../../components/public/Products/FeaturedProducts';
import SolutionsSection from '../../components/public/Solutions/SolutionsSection';
import TestimonialsSection from '../../components/public/Testimonials/TestimonialsSection';
import CtaSection from '../../components/public/Cta/CtaSection';
import NewsletterSection from '../../components/public/Newsletter/NewsletterSection';
import useHome from '../../hooks/useHome';

const HomePage = () => {
  const { data, isLoading, error, fetchHomeData, removeError } = useHome();
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchHomeData();
  }, [fetchHomeData]);

  if (isLoading && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <span>Loading...</span>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <p className="mb-4 text-sm text-red-400">{error}</p>
        <button
          type="button"
          onClick={() => {
            removeError();
            fetchHomeData();
          }}
          className="rounded-full bg-white px-6 py-2 text-xs font-semibold uppercase tracking-widest text-black"
        >
          Retry
        </button>
      </div>
    );
  }

  const hero = data?.hero || null;
  const highlights = Array.isArray(data?.highlights) ? data.highlights : [];
  const services = Array.isArray(data?.services) ? data.services : [];
  const testimonials = Array.isArray(data?.testimonials)
    ? data.testimonials
    : [];
  const categories = Array.isArray(data?.categories) ? data.categories : [];
  const ctaButtons = Array.isArray(data?.ctaButtons) ? data.ctaButtons : [];
  const settings = data?.settings || null;

  return (
    <div className="min-h-screen bg-black">
      <HeroSection
        hero={hero}
        highlights={highlights}
        cta={data?.header?.ctaButton || null}
      />
      <FeaturedProducts categories={categories} />
      <SolutionsSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection ctaButtons={ctaButtons} settings={settings} />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
