import scanPrint from '../../../assets/images/scan-print.png';
import digitalPrinting from '../../../assets/images/digital-printing.png';
import largeFormat from '../../../assets/images/large-format.png';
import binderyFinishing from '../../../assets/images/bindery-finishing.png';
import blueprintPrinting from '../../../assets/images/blueprint-printing.png';
import graphicDesign from '../../../assets/images/graphic-design.png';

const SolutionsSection = ({ services }) => {
  const fallbackServices = [
    {
      title: 'SCAN & PRINT',
      description:
        'Fast, reliable scanning and printing for everyday documents.',
      image: scanPrint,
    },
    {
      title: 'DIGITAL PRINTING SERVICES',
      description: 'High-quality prints for flyers, cards, and more.',
      image: digitalPrinting,
    },
    {
      title: 'LARGE FORMAT PRINTING',
      description: 'Posters, banners, and signs that stand out.',
      image: largeFormat,
    },
    {
      title: 'BINDERY & FINISHING',
      description: 'Professional folding, cutting, and binding.',
      image: binderyFinishing,
    },
    {
      title: 'BLUEPRINT PRINTING',
      description: 'Clear, precise prints for technical plans.',
      image: blueprintPrinting,
    },
    {
      title: 'GRAPHIC DESIGN SERVICES',
      description: 'Creative designs tailored to your needs.',
      image: graphicDesign,
    },
  ];

  const resolvedServices =
    Array.isArray(services) && services.length
      ? services.map((item) => ({
          title: item.title || '',
          description: item.description || '',
          image: item.image || '',
        }))
      : fallbackServices;

  return (
    <section className="bg-black px-4 py-10 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-12 xl:gap-24">
          <div className="grid-background-soft relative py-0 lg:w-1/3">
            <h2 className="mb-8 text-[32px] font-light leading-tight text-white md:text-[48px]">
              Complete <span className="font-bold">Print &</span> <br />
              <span className="font-bold">Design</span> Solutions
            </h2>
            <p className="max-w-md text-justify text-[15px] leading-relaxed text-white">
              We offer professional printing, copying, design, and bindery
              services tailored to your business needs no job too big or small.
              Reach out or visit us to get started.
            </p>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {resolvedServices.map((service, index) => (
                <div key={index} className="group flex flex-col">
                  <div
                    className="relative w-full overflow-hidden bg-zinc-900"
                    style={{ paddingBottom: '100%' }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="mb-1 font-bebas-neue text-[22px] uppercase tracking-wider text-white">
                      {service.title}
                    </h4>
                    <p className="text-[14px] leading-snug text-gray-400">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
